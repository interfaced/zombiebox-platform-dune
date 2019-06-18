/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {Common, Proportion} from 'zb/device/aspect-ratio/proportion';
import AbstractViewPort from 'zb/device/abstract-view-port';
import {Transferring} from 'zb/device/aspect-ratio/aspect-ratio';
import Rect from 'zb/geometry/rect';


/**
 */
export default class ViewPort extends AbstractViewPort {
	/**
	 * @param {Rect} containerRect
	 * @param {DunePlugin} plugin
	 */
	constructor(containerRect, plugin) {
		super(containerRect);

		/**
		 * @type {DunePlugin}
		 * @protected
		 */
		this._plugin = plugin;

		/**
		 * @type {Object<Proportion, DunePlugin.TypeAspectRatio>}
		 * @protected
		 */
		this._nativeAspectProportionMap = this._buildAspectRatioProportionMap();

		/**
		 * @type {Object<Transferring, DunePlugin.TypeVideoZoom>}
		 * @protected
		 */
		this._nativeAspectTransferringMap = this._buildAspectRatioTransferringMap();
	}

	/**
	 * @override
	 */
	hasAspectRatioFeature() {
		return true;
	}

	/**
	 * @override
	 */
	hasAreaChangeFeature() {
		return true;
	}

	/**
	 * @override
	 */
	isAspectRatioSupported(ratio) {
		return (this._isAspectProportionSupported(ratio.getProportion()) &&
			this._isAspectTransferringSupported(ratio.getTransferring())
		);
	}

	/**
	 * @override
	 */
	updateViewPort() {
		const screenArea = this.getCurrentArea();
		this._setAspectProportion(this._aspectRatio.getProportion());
		this._setAspectTransferring(this._aspectRatio.getTransferring());
		this._plugin.setWindowRect(screenArea.x0, screenArea.y0, screenArea.getSizeX(), screenArea.getSizeY());
	}

	/**
	 * TODO: Use return DunePlugin.TypeRC code
	 * @param {Proportion} proportion
	 * @return {?Proportion} Null if not supported
	 * @protected
	 */
	_setAspectProportion(proportion) {
		const native = this._nativeAspectProportionMap[proportion];

		if (typeof native === 'undefined') {
			return null;
		}

		this._plugin.setAspectRatio(native);

		return proportion;
	}

	/**
	 * @param {Transferring} transferring
	 * @return {?Transferring} Null if not supported
	 * @protected
	 */
	_setAspectTransferring(transferring) {
		const native = this._nativeAspectTransferringMap[transferring];

		if (typeof native === 'undefined') {
			return null;
		}

		this._plugin.setVideoZoom(native);

		return transferring;
	}

	/**
	 * @return {Object<Proportion, DunePlugin.TypeAspectRatio>}
	 * @protected
	 */
	_buildAspectRatioProportionMap() {
		const map = {};
		const dune = this._plugin;

		map[Common.AUTO] = dune.ASPECT_RATIO_AUTO;
		map[Common.X16X9] = dune.ASPECT_RATIO_16_9;
		map[Common.X4X3] = dune.ASPECT_RATIO_4_3;

		return map;
	}

	/**
	 * @return {Object<Transferring, DunePlugin.TypeVideoZoom>}
	 * @protected
	 */
	_buildAspectRatioTransferringMap() {
		const map = {};
		const dune = this._plugin;

		map[Transferring.LETTERBOX] = dune.VIDEO_ZOOM_NORMAL;
		map[Transferring.CROP] = dune.VIDEO_ZOOM_FULL_SCREEN;
		map[Transferring.STRETCH] = dune.VIDEO_ZOOM_STRETCH_TO_FULL_SCREEN;

		return map;
	}

	/**
	 * @param {Proportion} proportion
	 * @return {boolean}
	 * @protected
	 */
	_isAspectProportionSupported(proportion) {
		const isKeep = proportion === Common.KEEP;
		const isNative = this._nativeAspectProportionMap.hasOwnProperty(proportion);

		return isKeep || isNative;
	}

	/**
	 * @param {Transferring} transferring
	 * @return {boolean}
	 * @protected
	 */
	_isAspectTransferringSupported(transferring) {
		const isKeep = transferring === Transferring.KEEP;
		const isNative = this._nativeAspectTransferringMap.hasOwnProperty(transferring);

		return isKeep || isNative;
	}
}
