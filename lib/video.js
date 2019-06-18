/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {encodeParams} from 'zb/http/http';
import {State} from 'zb/device/interfaces/i-video';
import {debug} from 'zb/console/console';
import AbstractVideo from 'zb/device/abstract-video';
import ViewPort from './view-port';


/**
 */
export default class Video extends AbstractVideo {
	/**
	 * @param {DunePlugin} plugin
	 * @param {HTMLElement} videoContainer
	 */
	constructor(plugin, videoContainer) {
		super(videoContainer);

		/**
		 * @type {ViewPort}
		 * @protected
		 */
		this._viewport;

		/**
		 * @type {DunePlugin}
		 * @protected
		 */
		this._plugin = plugin;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._isPlayFromPosition = false;

		/**
		 * @type {number}
		 * @protected
		 */
		this._startPosition = 0;

		/**
		 * @type {number}
		 * @protected
		 */
		this._delayedRate = NaN;

		/**
		 * @type {?{url: string, startPosition: (number|undefined)}}
		 * @protected
		 */
		this._delayPlayParams = null;

		/**
		 * @type {number}
		 * @protected
		 */
		this._saveRateChangeTimeout = 1000;

		/**
		 * @type {number}
		 * @protected
		 */
		this._setRateTimeoutId = NaN;

		/**
		 * @type {number}
		 * @protected
		 */
		this._positionPollingId = NaN;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._hasLength = false;

		/**
		 * @type {number}
		 * @protected
		 */
		this._valueDuration = NaN;

		/**
		 * @type {number}
		 * @protected
		 */
		this._volume = this._plugin.getVolume();

		/**
		 * @type {string}
		 * @protected
		 */
		this._url = '';

		/**
		 * @type {Object}
		 * @protected
		 */
		this._httpHeaders;

		/**
		 * @type {number}
		 * @protected
		 */
		this._rate;

		/**
		 * @type {!Object}
		 * @protected
		 */
		this._rateToSpeedMap;

		/**
		 * @type {!Object}
		 * @protected
		 */
		this._speedToRateMap;

		/**
		 * Fired with: none
		 * @const {string}
		 */
		this.EVENT_DESTROYED = 'destroyed';

		/**
		 * Fired with: none
		 * @const {string}
		 */
		this.EVENT_REQUEST_FOR_STOP_VIDEO = 'request-for-stop-video';

		this._initViewPort();
		this._buildSpeedsMaps();
		this._applyDelayedRate = this._applyDelayedRate.bind(this);
		this._timeUpdate = this._timeUpdate.bind(this);

		this._setState(State.INITED);

		this._serviceSetRate(0);
	}

	/**
	 * @override
	 */
	setVolume(value) {
		const pluginValue = this.getVolume() === 0 && value === 1 ? 2 : value;

		this._plugin.setVolume(pluginValue);
		this._volume = value;

		this._fireEvent(this.EVENT_VOLUME_CHANGE, this._volume);
		debug('EVENT_VOLUME_CHANGE', this._volume);
	}

	/**
	 * @override
	 */
	getVolume() {
		return this._volume;
	}

	/**
	 * @override
	 */
	getMuted() {
		return this._plugin.isMuteEnabled();
	}

	/**
	 * @override
	 */
	setMuted(value) {
		const muteStateChanged = value !== this.getMuted();
		if (value) {
			this._plugin.enableMute();
		} else {
			this._plugin.disableMute();
		}
		if (muteStateChanged) {
			this._fireEvent(this.EVENT_VOLUME_CHANGE, this._volume);
		}
	}

	/**
	 * @override
	 */
	isMuted() {
		return this.getMuted();
	}

	/**
	 * @override
	 */
	destroy() {
		debug('destroy video');
		this._fireEvent(this.EVENT_DESTROYED);
		this.stop();
		this._url = '';
	}

	/**
	 * @override
	 */
	forward() {
		const currentSpeed = this._plugin.getSpeed();
		const nextSpeed = this._calculateNextSpeed(currentSpeed);
		this._setRate(this._speedToRateMap[nextSpeed]);

		return true;
	}

	/**
	 * @override
	 */
	rewind() {
		const currentSpeed = this._plugin.getSpeed();
		const previousSpeed = this._calculatePreviousSpeed(currentSpeed);
		this._setRate(-this._speedToRateMap[-previousSpeed]);

		return true;
	}

	/**
	 * @override
	 */
	getPlaybackRate() {
		return this._rate;
	}

	/**
	 * @override
	 */
	setPlaybackRate(rate) {
		const isPositive = rate >= 0;
		let speed = Math.abs(rate);

		for (let pow = 5; pow > -6; pow--) {
			const val = Math.pow(2, pow);
			if (val < speed) {
				speed = Math.pow(2, pow + 1);
				break;
			}
		}
		if ((speed > 0) && (speed <= 0.03125)) {
			speed = (isPositive ? 1 : -1) * 0.03125;
		} else {
			speed = (isPositive ? 1 : -1) * speed;
		}
		this._serviceSetRate(rate);
		this._plugin.setSpeed(speed);
	}

	/**
	 * @override
	 */
	play(url, opt_startFrom) {
		const startFrom = opt_startFrom < 1 ? undefined : /** @type {number} */ (opt_startFrom);

		this._url = url;

		if (this._plugin.getPlaybackState() !== this._plugin.PLAYBACK_STATE_STOPPED) {
			this._delayPlayParams = {
				url: url,
				startPosition: startFrom
			};
			this._fireEvent(this.EVENT_REQUEST_FOR_STOP_VIDEO);

			return;
		}

		const urlWithParams = this._appendPlayParams(url);

		debug('play url:', urlWithParams, ' start from: ', startFrom);
		if (startFrom) {
			this._isPlayFromPosition = true;
			this._startPosition = startFrom;
			this._plugin.setInitialPositionInSeconds(Math.round(this._startPosition / 1000));
		}
		this._plugin.play(urlWithParams);
		this._serviceSetRate(1);
	}

	/**
	 * @override
	 */
	getUrl() {
		return this._url;
	}

	/**
	 * @override
	 */
	pause() {
		this._plugin.pause();
		this._serviceSetRate(0);
	}

	/**
	 * @override
	 */
	resume() {
		switch (this.getState()) {
			case State.PAUSED:
			case State.SEEKING:
				this._serviceSetRate(1);
				this._plugin.resume();
				break;
		}
	}

	/**
	 * @override
	 */
	stop() {
		this._fireEvent(this.EVENT_REQUEST_FOR_STOP_VIDEO);

		this._serviceSetRate(0);
		this._fireEvent(this.EVENT_DURATION_CHANGE, 0);
		this._fireEvent(this.EVENT_TIME_UPDATE, 0);
	}

	/**
	 * @override
	 */
	getDuration() {
		return this._valueDuration;
	}

	/**
	 * @override
	 */
	getState() {
		this._updateState();

		return super.getState();
	}

	/**
	 * @override
	 */
	getPosition() {
		if (this._hasLength) {
			return this._plugin.getPositionInSeconds() * 1000;
		}

		return -1;
	}

	/**
	 * @override
	 */
	setPosition(value) {
		this._plugin.setPositionInSeconds(Math.round(value / 1000));
	}

	/**
	 * @param {Object<string, string>} data
	 */
	setHttpHeaders(data) {
		debug('data:', data);
		this._httpHeaders = data;
	}

	/**
	 * @return {Object<string, string>}
	 */
	getHttpHeaders() {
		return this._httpHeaders || {};
	}

	/**
	 * @param {string} zbEvent
	 * @param {number} previousState
	 * @param {number} state
	 * @param {number} event
	 */
	playbackEventCallback(zbEvent, previousState, state, event) {
		let needUpdateState = false;

		debug(
			'Dune current,prev,state: ',
			this._eventToString(event), this._stateToString(previousState), this._stateToString(state)
		);

		this._hasLength = this._plugin.hasLength();

		if (state === this._plugin.PLAYBACK_STATE_PLAYING) {
			this._startPositionPolling();
		} else {
			this._stopPositionPolling();
		}

		switch (state) {
			case this._plugin.PLAYBACK_STATE_STOPPED:
				if (this._delayPlayParams) {
					const {url, startPosition} = this._delayPlayParams;
					this._delayPlayParams = null;
					this.play(url, startPosition);
				} else {
					needUpdateState = true;
					this._fireEvent(this.EVENT_STOP);
				}
				break;
			case this._plugin.PLAYBACK_STATE_INITIALIZING:
				needUpdateState = true;
				this._fireEvent(this.EVENT_LOAD_START);
				break;
			case this._plugin.PLAYBACK_STATE_PLAYING:
				if (this._isPlayFromPosition) {
					break;
				}
				needUpdateState = true;
				this._fireEvent(this.EVENT_PLAY);
				break;
			case this._plugin.PLAYBACK_STATE_PAUSED:
				if (this._isPlayFromPosition) {
					this._isPlayFromPosition = false;
				}
				needUpdateState = true;
				this._fireEvent(this.EVENT_PAUSE);
				break;
			case this._plugin.PLAYBACK_STATE_SEEKING:
				if (this._isPlayFromPosition) {
					break;
				}
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_STATE_BUFFERING:
				needUpdateState = true;
				this._fireEvent(this.EVENT_BUFFERING);
				break;
			case this._plugin.PLAYBACK_STATE_FINISHED:
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_STATE_DEINITIALIZING:
				needUpdateState = true;
				break;
		}

		let errorMessage = null;
		switch (event) {
			case this._plugin.PLAYBACK_EVENT_MEDIA_DESCRIPTION_CHANGED:
				const duration = this._plugin.getLengthInSeconds() * 1000;
				if (this._valueDuration !== duration) {
					this._fireEvent(this.EVENT_DURATION_CHANGE, duration);
					this._fireEvent(this.EVENT_LOADED_META_DATA);
					this._valueDuration = duration;
					if (this._isPlayFromPosition && this._valueDuration < this._startPosition) {
						this._isPlayFromPosition = false;
						this._plugin.setInitialPositionInSeconds(0);
					}
				}

				this._viewport.updateViewPort();

				break;
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_FORMAT_NOT_SUPPORTED:
				errorMessage = 'MEDIA_FORMAT_NOT_SUPPORTED';
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_EVENT_ERROR_INTERNAL_ERROR:
				errorMessage = 'INTERNAL_ERROR';
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_READ_FAILED:
				errorMessage = 'MEDIA_READ_FAILED';
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_OPEN_FAILED:
				errorMessage = 'MEDIA_OPEN_FAILED';
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED:
				errorMessage = 'PROTOCOL_NOT_SUPPORTED';
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_PERMISSION_DENIED:
				errorMessage = 'PERMISSION_DENIED';
				needUpdateState = true;
				break;
			case this._plugin.PLAYBACK_EVENT_END_OF_MEDIA:
				this._fireEvent(this.EVENT_ENDED);
				break;
		}
		if (errorMessage) {
			this._fireEvent(this.EVENT_ERROR, errorMessage);
		}

		if (needUpdateState) {
			this._updateState();
		}
	}

	/**
	 * @override
	 */
	_createViewPort(containerRect) {
		return new ViewPort(containerRect, this._plugin);
	}

	/**
	 * REFERENCE: http://files.dune-hd.com/sdk/doc/txt/media_url.txt
	 * @param {string} url
	 * @return {string}
	 * @protected
	 */
	_appendPlayParams(url) {
		const playParams = ['hls_seek_live:1'];
		const hlsKeyHeaders = encodeParams(this.getHttpHeaders() || {});

		if (hlsKeyHeaders) {
			playParams.push(`hls_key_url_add_query:${hlsKeyHeaders}`);
		}

		return `${url}|||dune_params|||${playParams.join('|')}`;
	}

	/**
	 * @protected
	 */
	_buildSpeedsMaps() {
		this._speedToRateMap = {};
		this._rateToSpeedMap = {};
		for (let i = 0; i < 11; i++) {
			const speed = Math.pow(2, 13 - i);
			const rate = Math.pow(2, 5 - i);
			this._speedToRateMap[speed] = rate;
			this._rateToSpeedMap[rate] = speed;
		}
	}

	/**
	 * @protected
	 */
	_applyDelayedRate() {
		this._setRateTimeoutId = NaN;
		const rate = this._delayedRate;
		if (!isNaN(rate)) {
			this._delayedRate = NaN;
			this._setRate(rate);
		}
	}

	/**
	 * @param {number} rate
	 * @protected
	 */
	_setRate(rate) {
		if (isNaN(this._setRateTimeoutId)) {
			this.setPlaybackRate(rate);
			this._setRateTimeoutId = setTimeout(this._applyDelayedRate, this._saveRateChangeTimeout);
		} else {
			this._delayedRate = rate;
		}
	}

	/**
	 * @param {number} rate
	 * @protected
	 */
	_serviceSetRate(rate) {
		this._rate = rate;
		this._fireEvent(this.EVENT_RATE_CHANGE, this._rate);
	}

	/**
	 * @protected
	 */
	_startPositionPolling() {
		this._stopPositionPolling();
		this._positionPollingId = setTimeout(this._timeUpdate, 300);
	}

	/**
	 * @protected
	 */
	_stopPositionPolling() {
		clearTimeout(this._positionPollingId);
	}

	/**
	 * @protected
	 */
	_timeUpdate() {
		this._startPositionPolling();
		const position = this.getPosition();
		this._fireEvent(this.EVENT_TIME_UPDATE, position);
	}

	/**
	 * For debug purposes only.
	 * @param {number} event
	 * @return {string}
	 * @protected
	 */
	_eventToString(event) {
		const map = {};
		map[this._plugin.PLAYBACK_EVENT_MEDIA_DESCRIPTION_CHANGED] = 'MEDIA_DESCRIPTION_CHANGED';
		map[this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_FORMAT_NOT_SUPPORTED] = 'ERROR_MEDIA_FORMAT_NOT_SUPPORTED';
		map[this._plugin.PLAYBACK_EVENT_ERROR_INTERNAL_ERROR] = 'ERROR_INTERNAL_ERROR';
		map[this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_READ_FAILED] = 'ERROR_MEDIA_READ_FAILED';
		map[this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_OPEN_FAILED] = 'ERROR_MEDIA_OPEN_FAILED';
		map[this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED] = 'ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED';
		map[this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_PERMISSION_DENIED] = 'ERROR_MEDIA_PERMISSION_DENIED';
		map[this._plugin.PLAYBACK_EVENT_END_OF_MEDIA] = 'END_OF_MEDIA';
		map[this._plugin.PLAYBACK_EVENT_NO_EVENT] = 'NO_EVENT';
		map[this._plugin.PLAYBACK_EVENT_EXTERNAL_ACTION] = 'EXTERNAL_ACTION';

		return map[event] || `UNKNOWN PLAYBACK EVENT ${event}`;
	}

	/**
	 * For debug purposes only.
	 * @param {number} state One of DunePlugin.TypePlaybackState
	 * @return {string}
	 * @protected
	 */
	_stateToString(state) {
		const map = {};
		map[this._plugin.PLAYBACK_STATE_STOPPED] = 'STOPPED';
		map[this._plugin.PLAYBACK_STATE_INITIALIZING] = 'INITIALIZING';
		map[this._plugin.PLAYBACK_STATE_PLAYING] = 'PLAYING';
		map[this._plugin.PLAYBACK_STATE_PAUSED] = 'PAUSED';
		map[this._plugin.PLAYBACK_STATE_SEEKING] = 'SEEKING';
		map[this._plugin.PLAYBACK_STATE_BUFFERING] = 'BUFFERING';
		map[this._plugin.PLAYBACK_STATE_FINISHED] = 'FINISHED';
		map[this._plugin.PLAYBACK_STATE_DEINITIALIZING] = 'DEINITIALIZING';

		return map[state] || `UNKNOWN PLAYBACK STATE ${state}`;
	}

	/**
	 *
	 * @param {number} currentSpeed
	 * @return {number}
	 * @protected
	 */
	_calculateNextSpeed(currentSpeed) {
		let nextSpeed;
		if (currentSpeed <= 0) {
			nextSpeed = this._rateToSpeedMap[2];
		} else if (currentSpeed > 0) {
			nextSpeed = Object.keys(this._speedToRateMap)
				.filter((speed) => (+speed) > currentSpeed)
				.sort((a, b) => a - b)
				.shift();
		}

		if (nextSpeed === undefined || isNaN(currentSpeed)) {
			return currentSpeed;
		}

		return nextSpeed;
	}

	/**
	 *
	 * @param {number} currentSpeed
	 * @return {number}
	 * @protected
	 */
	_calculatePreviousSpeed(currentSpeed) {
		let previousSpeed;
		if (currentSpeed >= 0) {
			previousSpeed = -1 * this._rateToSpeedMap[2];
		} else if (currentSpeed < 0) {
			previousSpeed = -Object.keys(this._speedToRateMap)
				.filter((speed) => (-speed) < currentSpeed)
				.sort((a, b) => a - b)
				.shift();
		}

		if (previousSpeed === undefined || isNaN(previousSpeed)) {
			return currentSpeed;
		}

		return previousSpeed;
	}

	/**
	 * @protected
	 */
	_updateState() {
		let newState;
		const state = this._plugin.getPlaybackState();

		switch (state) {
			case this._plugin.PLAYBACK_STATE_STOPPED:
				newState = State.STOPPED;
				break;
			case this._plugin.PLAYBACK_STATE_INITIALIZING:
				newState = State.INITED;
				break;
			case this._plugin.PLAYBACK_STATE_PLAYING:
				newState = State.PLAYING;
				break;
			case this._plugin.PLAYBACK_STATE_PAUSED:
				newState = State.PAUSED;
				break;
			case this._plugin.PLAYBACK_STATE_SEEKING:
				newState = State.SEEKING;
				break;
			case this._plugin.PLAYBACK_STATE_BUFFERING:
				newState = State.BUFFERING;
				break;
			case this._plugin.PLAYBACK_STATE_FINISHED:
				newState = State.UNINITED;
				break;
			case this._plugin.PLAYBACK_STATE_DEINITIALIZING:
				newState = State.DEINITED;
				break;

			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_FORMAT_NOT_SUPPORTED:
			case this._plugin.PLAYBACK_EVENT_ERROR_INTERNAL_ERROR:
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_READ_FAILED:
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_OPEN_FAILED:
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED:
			case this._plugin.PLAYBACK_EVENT_ERROR_MEDIA_PERMISSION_DENIED:
			case this._plugin.PLAYBACK_EVENT_END_OF_MEDIA:
				newState = State.ERROR;
				break;
		}

		if (newState) {
			this._setState(newState);
		}
	}
}
