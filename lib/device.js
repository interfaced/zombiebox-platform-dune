/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {decodeParams} from 'zb/http/http';
import {getCSS} from 'zb/html';
import {log, warn, debug, error} from 'zb/console/console';
import AbstractDevice from 'zb/device/abstract-device';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import Info from './info';
import Input from './input';
import Storage from './storage';
import Video from './video';


/**
 */
export default class Device extends AbstractDevice {
	/**
	 * @param {HTMLElement} pluginContainer
	 * @param {HTMLElement} videoContainer
	 */
	constructor(pluginContainer, videoContainer) {
		super();

		/**
		 * @type {Info}
		 */
		this.info;

		/**
		 * @type {Input}
		 */
		this.input;

		/**
		 * @type {Storage}
		 */
		this.storage;

		/**
		 * @type {DunePlugin}
		 * @protected
		 */
		this._stbAPI = /** @type {DunePlugin} */ (document.createElement('object'));

		/**
		 * @type {string}
		 * @protected
		 */
		this._backgroundColor = '';

		/**
		 * @type {HTMLElement}
		 * @protected
		 */
		this._videoContainer = videoContainer;

		/**
		 * @type {HTMLElement}
		 * @protected
		 */
		this._pluginContainer = pluginContainer;

		/**
		 * @type {boolean}
		 * @protected
		 */
		this._stopASAP = false;

		/**
		 * Fired with: number, number, number, previousState, currentState, lastEvent
		 * @const {string}
		 */
		this.EVENT_PLAYBACK = 'playback';

		this._stbAPI.setAttribute('type', 'application/x-dune-stb-api');

		if (pluginContainer) {
			pluginContainer.appendChild(this._stbAPI);
			if (!this._stbAPI.init()) {
				error('Cant init Dune STB API');
			} else {
				debug('Dune STB API successfully loaded');
			}
		} else {
			error('Application has no additional container');
		}

		document.body.addEventListener('unload', () => {
			this._stbAPI.deinit();
		}, false);

		this._stbAPI.setPlaybackEventCallback((previousState, currentState, lastEvent) => {
			if (this._stopVideo()) {
				return;
			}

			this._fireEvent(this.EVENT_PLAYBACK, previousState, currentState, lastEvent);
		});
	}

	/**
	 * @override
	 */
	init() {
		this.info = new Info(this._stbAPI);
		this.input = new Input();
		this.storage = new Storage(this._stbAPI);

		this.info
			.init()
			.then(
				() => this._fireEvent(this.EVENT_READY),
				(e) => {
					warn(`[Device]::[init]::${e}`);
					this._fireEvent(this.EVENT_READY);
				}
			);
	}

	/**
	 * @override
	 */
	createVideo() {
		const video = new Video(this.getPluginObject(), this._videoContainer);

		const onPlayback = (zbEvent, previousState, state, event) => {
			video.playbackEventCallback(zbEvent, previousState, state, event);
		};
		const stopASAP = () => this.stopVideoASAP();
		const subscribe = () => {
			this.on(this.EVENT_PLAYBACK, onPlayback);
			video.on(video.EVENT_REQUEST_FOR_STOP_VIDEO, stopASAP);
		};
		const unsubscribe = () => {
			this.off(this.EVENT_PLAYBACK, onPlayback);
			video.off(video.EVENT_REQUEST_FOR_STOP_VIDEO, stopASAP);
		};

		subscribe();
		video.on(video.EVENT_DESTROYED, unsubscribe);

		return video;
	}

	/**
	 * @override
	 */
	exit() {
		this._stbAPI.launchNativeUi();
	}

	/**
	 * @override
	 */
	getEnvironment() {
		throw new UnsupportedFeature('Environment getting');
	}

	/**
	 * @override
	 */
	getLaunchParams() {
		return decodeParams(window.location.search.substring(1));
	}

	/**
	 * @override
	 */
	isUHDSupported() {
		return false;
	}

	/**
	 * @override
	 */
	hasOSDOpacityFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasOSDChromaKeyFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasOSDAlphaBlendingFeature() {
		return false;
	}

	/**
	 * @override
	 */
	setOSDOpacity(value) {
		this._stbAPI.setBrowserAlphaLevel(value * 255);
	}

	/**
	 * @override
	 */
	getOSDOpacity() {
		return parseFloat((this._stbAPI.getBrowserAlphaLevel() / 255).toFixed(3));
	}

	/**
	 * @override
	 */
	getIP() {
		return this._stbAPI.getIpAddress();
	}

	/**
	 * @override
	 */
	getMAC() {
		return this._stbAPI.getPrimaryMacAddress();
	}

	/**
	 * @override
	 */
	setOSDChromaKey(chromaKey) {
		const body = document.body;
		this._backgroundColor = body.style.backgroundColor;
		body.style.backgroundColor = chromaKey;
		const rgb = getCSS(body, 'background-color');
		if (rgb) {
			this._stbAPI.setColorKey(this._rgb2hex(rgb));
		}
	}

	/**
	 * @override
	 */
	getOSDChromaKey() {
		const hex = (h) => h.toString(16).padStart(2, '0');

		const color = this._stbAPI.getColorKey();
		const r = (color >> 16) & 255;
		const g = (color >> 8) & 255;
		const b = color & 255;

		return '#' + hex(r) + hex(g) + hex(b);
	}

	/**
	 * @override
	 */
	removeOSDChromaKey() {
		document.body.style.backgroundColor = this._backgroundColor;
		this._stbAPI.disableColorKey();
	}

	/**
	 * @deprecated Use removeOSDChromaKey()
	 */
	removeChromakey() {
		this.removeOSDChromaKey();
	}

	/**
	 * @deprecated Use getOSDChromaKey()
	 * @return {?string}
	 */
	getChromakey() {
		return this.getOSDChromaKey();
	}

	/**
	 * @deprecated Use setOSDChromaKey(color)
	 * @param {string} chromaKey
	 */
	setChromakey(chromaKey) {
		this.setOSDChromaKey(chromaKey);
	}

	/**
	 * @return {DunePlugin}
	 */
	getPluginObject() {
		return this._stbAPI;
	}

	/**
	 * @return {boolean}
	 */
	isWebKit() {
		return /Arora/.test(navigator.userAgent);
	}

	/**
	 * Stop video as soon as possible. All events except STOP will be ignored.
	 */
	stopVideoASAP() {
		if (this.canStopVideo()) {
			this._stbAPI.stop();
			this._stopASAP = false;
		} else {
			this._stopASAP = true;
		}
	}

	/**
	 * @return {boolean}
	 */
	canStopVideo() {
		const niceStatesForStop = [
			this._stbAPI.PLAYBACK_STATE_PLAYING,
			this._stbAPI.PLAYBACK_STATE_PAUSED,
			this._stbAPI.PLAYBACK_STATE_SEEKING,
			this._stbAPI.PLAYBACK_STATE_STOPPED
		];

		const state = this._stbAPI.getPlaybackState();

		return niceStatesForStop.indexOf(state) !== -1;
	}

	/**
	 * @return {boolean}
	 * @protected
	 */
	_stopVideo() {
		if (this._stopASAP) {
			log('STOP ASAP');
			if (this.canStopVideo()) {
				log('STOP ASAP DO');
				this._stbAPI.stop();
				this._stopASAP = false;
			}

			return true;
		}

		return false;
	}

	/**
	 * @param {string} strRGB
	 * @return {number}
	 * @protected
	 */
	_rgb2hex(strRGB) {
		return this._constructHEX(this._rgbStr2Array(strRGB));
	}

	/**
	 * @param {string} rgb rgb(1, 2, 3) or rgba(1, 2, 3, 4)
	 * @return {Array<number>}
	 * @protected
	 */
	_rgbStr2Array(rgb) {
		const exp = /rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+)?\)/;
		if (!exp.test(rgb)) {
			debug(`Failed to find background color. String does not conform to the standard. Value: ${rgb}`);

			return [0, 0, 0];
		}

		return exp.exec(rgb)
			.slice(1, 4)
			.map(Number);
	}

	/**
	 * @param {Array<number>} arr
	 * @return {number}
	 * @protected
	 */
	_constructHEX(arr) {
		const hexStr = arr
			.map((color) => {
				const hex = color.toString(16);

				return hex.length < 2 ? `0${hex}` : hex;
			})
			.join('');

		return parseInt(hexStr, 16);
	}

	/**
	 * @return {boolean}
	 */
	static detect() {
		const result = /DuneHD/.test(navigator.userAgent) || /Arora/.test(navigator.userAgent);
		debug('detect dune', result ? 'true' : 'false', navigator.userAgent);

		return result;
	}
}
