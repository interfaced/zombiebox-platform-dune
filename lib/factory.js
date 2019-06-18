/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import app from 'generated/app';
import Device from './device';


/**
 * @return {?Device}
 */
const createDevice = () => {
	const isDunePlatform = Device.detect();

	if (isDunePlatform) {
		const pluginContainer = app.getPluginContainer();
		const videoContainer = app.getVideoContainer();

		return new Device(pluginContainer, videoContainer);
	}

	return null;
};

export default createDevice;
