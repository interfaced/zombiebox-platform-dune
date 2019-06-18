/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import BaseLogger from 'zb/console/loggers/base-logger';


/**
 * Usage:
 *      In JS application: zb.console.setLogger(new Logger(app.device.getPluginObject()));
 *      On device run: # tail -F /tmp/run/shell.log
 */
export default class Logger extends BaseLogger {
	/**
	 * @param {DunePlugin} dunePlugin
	 */
	constructor(dunePlugin) {
		super();
		/**
		 * @type {DunePlugin}
		 * @protected
		 */
		this._plugin = dunePlugin;
	}

	/**
	 * @override
	 */
	_send(level, args) {
		const logStr = BaseLogger.level2string(level) + ' ' + args.map(String).join(' ');
		this._plugin.log(logStr);
	}
}
