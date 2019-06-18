/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import packageInfo from 'generated/package-info';
import {send} from 'zb/http/xhr';
import {Method} from 'zb/http/http';
import AbstractInfo from 'zb/device/abstract-info';
import {Resolution} from 'zb/device/resolutions';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import Locales from './consts/locales';


/**
 */
export default class Info extends AbstractInfo {
	/**
	 * @param {DunePlugin} stbAPI
	 */
	constructor(stbAPI) {
		super();

		/**
		 * @type {string}
		 * @protected
		 */
		this._systemLocale = '';

		/**
		 * @type {DunePlugin}
		 * @protected
		 */
		this._stbAPI = stbAPI;
	}

	/**
	 * @override
	 */
	type() {
		return 'dune';
	}

	/**
	 * @override
	 */
	version() {
		throw new UnsupportedFeature('Version getting');
	}

	/**
	 * @override
	 */
	manufacturer() {
		return 'Dune HD';
	}

	/**
	 * @override
	 */
	model() {
		return this._stbAPI.getProductId();
	}

	/**
	 * @override
	 */
	serialNumber() {
		return this._stbAPI.getSerialNumber();
	}

	/**
	 * @override
	 */
	softwareVersion() {
		return this._stbAPI.getFirmwareVersion();
	}

	/**
	 * @override
	 */
	hardwareVersion() {
		throw new UnsupportedFeature('Hardware version getting');
	}

	/**
	 * @override
	 */
	osdResolutionType() {
		const resolutions = this._getResolutionsByScreenSize(window.outerWidth, window.outerHeight);

		return resolutions[0] || Resolution.HD;
	}

	/**
	 * @return {IThenable<string>}
	 */
	init() {
		return this._executeCgiScript('locale.awk')
			.then(
				(rawLocale) => {
					this._systemLocale = this._normalizeLocale(rawLocale);

					return this._systemLocale;
				},
				(error) => error
			);
	}

	/**
	 * @override
	 */
	_getLocale() {
		return this._systemLocale;
	}

	/**
	 * @param {string} rawLocale
	 * @return {string}
	 * @protected
	 */
	_normalizeLocale(rawLocale) {
		return Locales[rawLocale.trim()];
	}

	/**
	 * @param {string} script
	 * @return {IThenable<string>}
	 * @protected
	 */
	_executeCgiScript(script) {
		const appName = packageInfo['name'];
		const scriptUrl = `http://localhost/cgi-bin/plugins/${appName}/${script}`;

		return send(scriptUrl, {
			method: Method.GET
		})
			.then(
				(xhr) => xhr.responseText,
				(xhr) => `[Info]::[_executeCgiScript] Failed with status code : ${xhr.status}`
			);
	}
}
