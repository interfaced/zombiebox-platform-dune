/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import IStorage from 'zb/device/interfaces/i-storage';


/**
 * @implements {IStorage}
 */
export default class Storage {
	/**
	 * @param {DunePlugin} stbAPI
	 */
	constructor(stbAPI) {
		/**
		 * @type {DunePlugin}
		 * @protected
		 */
		this._plugin = stbAPI;

		/**
		 * @type {string}
		 * @protected
		 */
		this._prefix = '';
	}

	/**
	 * @override
	 */
	setKeyPrefix(prefix) {
		this._prefix = prefix;
	}

	/**
	 * @override
	 */
	getItem(key) {
		return this._plugin.getUserSetting(this._prefix + key);
	}

	/**
	 * @override
	 */
	setItem(key, value) {
		this._plugin.setUserSetting(this._prefix + key, value);
	}

	/**
	 * @override
	 */
	removeItem(key) {
		this._plugin.setUserSetting(this._prefix + key, '');
	}
}
