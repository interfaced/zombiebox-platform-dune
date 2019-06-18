/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2013-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import AbstractInput from 'zb/device/abstract-input';
import UnsupportedFeature from 'zb/device/errors/unsupported-feature';
import Keys from 'zb/device/input/keys';


/**
 */
export default class Input extends AbstractInput {
	/**
	 * @override
	 */
	isPointingDeviceSupported() {
		return false;
	}

	/**
	 * @override
	 */
	enablePointingDevice() {
		throw new UnsupportedFeature('Pointing device enabling');
	}

	/**
	 * @override
	 */
	disablePointingDevice() {
		throw new UnsupportedFeature('Pointing device disabling');
	}

	/**
	 * @override
	 */
	_createKeysMap() {
		const map = {};
		map[19] = Keys.PAUSE;
		map[250] = Keys.PLAY_PAUSE;
		map[218] = Keys.PLAY;
		map[178] = Keys.STOP;
		map[204] = Keys.REW;
		map[205] = Keys.FWD;

		map[8] = Keys.BACK;
		map[27] = Keys.BACK; // Esc on attached remote keyboard.
		map[13] = Keys.ENTER;
		map[12] = Keys.BACKSPACE;

		map[18] = Keys.MENU;
		map[199] = Keys.INFO;
		map[176] = Keys.NEXT_CHAPTER;
		map[177] = Keys.PREV_CHAPTER;

		map[174] = Keys.VOLUME_DOWN;
		map[175] = Keys.VOLUME_UP;
		map[173] = Keys.MUTE;
		map[33] = Keys.PAGE_UP; // Page Up on attached remote keyboard.
		map[34] = Keys.PAGE_DOWN; // Page Down on attached remote keyboard.

		map[193] = Keys.RED;
		map[194] = Keys.GREEN;
		map[195] = Keys.YELLOW;
		map[196] = Keys.BLUE;

		map[37] = Keys.LEFT;
		map[39] = Keys.RIGHT;
		map[38] = Keys.UP;
		map[40] = Keys.DOWN;

		map[48] = Keys.DIGIT_0;
		map[49] = Keys.DIGIT_1;
		map[50] = Keys.DIGIT_2;
		map[51] = Keys.DIGIT_3;
		map[52] = Keys.DIGIT_4;
		map[53] = Keys.DIGIT_5;
		map[54] = Keys.DIGIT_6;
		map[55] = Keys.DIGIT_7;
		map[56] = Keys.DIGIT_8;
		map[57] = Keys.DIGIT_9;

		map[202] = Keys.ASPECT_RATIO;

		return map;
	}
}
