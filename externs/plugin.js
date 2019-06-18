/**
 * Based on js_stb_sdk-121129_1720
 * @constructor
 * @extends {HTMLElement}
 */
function DunePlugin() {}


/** @type {number} */
DunePlugin.prototype.OK = 0;


/** @type {number} */
DunePlugin.prototype.ALREADY_INITIALIZED = 1;


/** @type {number} */
DunePlugin.prototype.NOT_INITIALIZED = 2;


/** @type {number} */
DunePlugin.prototype.POWER_OFF = 3;


/** @type {number} */
DunePlugin.prototype.ERROR = 1000;


/** @type {number} */
DunePlugin.prototype.INVALID_ARGUMENT = 1001;


/** @type {number} */
DunePlugin.prototype.NOT_SUPPORTED = 1002;


/**
 * @return {boolean}
 */
DunePlugin.prototype.init = function() {
	return true;
};


/**
 * Deinit API
 */
DunePlugin.prototype.deinit = function() {};


/**
 * @return {string}
 */
DunePlugin.prototype.getApiVersion = function() {
	return '';
};


/**
 * @return {string}
 */
DunePlugin.prototype.getProductId = function() {
	return '';
};


/**
 *
 * @return {string} s/n like xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
 */
DunePlugin.prototype.getSerialNumber = function() {
	return '';
};


/**
 * @return {string}
 */
DunePlugin.prototype.getFirmwareVersion = function() {
	return '';
};


/**
 * Returns MAC address of current network interface.
 * @return {string} MAC like xx:xx:xx:xx:xx:xx
 */
DunePlugin.prototype.getMacAddress = function() {
	return '';
};


/**
 * Returns MAC address of Ethernet network interface.
 * @return {string} MAC like xx:xx:xx:xx:xx:xx
 */
DunePlugin.prototype.getPrimaryMacAddress = function() {
	return '';
};


/**
 * Returns current effective IP address.
 * @return {string}
 */
DunePlugin.prototype.getIpAddress = function() {
	return '';
};


/**
 * @return {string}
 */
DunePlugin.prototype.getDns1Address = function() {
	return '';
};


/**
 * @return {string}
 */
DunePlugin.prototype.getDns2Address = function() {
	return '';
};


/**
 * @return {string}
 */
DunePlugin.prototype.getGatewayAddress = function() {
	return '';
};


/**
 * Logs message to application's stderr.
 * @param {string} message
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.log = function(message) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Reboots device.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.reboot = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.STANDBY_MODE_OFF = 0;


/** @type {number} */
DunePlugin.prototype.STANDBY_MODE_ON = 1;


/**
 * Result:
 *  STANDBY_MODE_OFF = 0
 *  STANDBY_MODE_ON = 1
 * @return {DunePlugin.prototype.TypeStandbyMode}
 */
DunePlugin.prototype.getStandbyMode = function() {};


/**
 * Puts device into standby mode or returns it back to normal mode.
 * Argument:
 *  STANDBY_MODE_OFF = 0
 *  STANDBY_MODE_ON = 1
 * @param {number} mode
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setStandbyMode = function(mode) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @param {string} path
 * @return {boolean}
 */
DunePlugin.prototype.fileExists = function(path) {
	return true;
};


/**
 * @param {string} key
 * @return {string}
 */
DunePlugin.prototype.getUserSetting = function(key) {
	return '';
};


/**
 * @param {string} key
 * @param {string} value
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setUserSetting = function(key, value) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns URL of firmware image got from DHCP server.
 * @return {string}
 */
DunePlugin.prototype.getFirmwareUpgradeUrl = function() {
	return '';
};


/**
 * Returns version of firmware got from DHCP server.
 * @return {string}
 */
DunePlugin.prototype.getFirmwareUpgradeVersion = function() {
	return '';
};


/**
 * @param {string} url - HTTP or multicast URL of firmware image
 * @param {string} version - firmware version string
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.startFirmwareUpgrade = function(url, version) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.RESET_SETTINGS_FULL = 0;


/** @type {number} */
DunePlugin.prototype.RESET_SETTINGS_SOFT = 1;


/**
 * Resets STB settings to factory defaults. In case reset is performed
 * successfully function does not return and makes reboot of STB.
 *
 * @param {number} reset RESET_SETTINGS_FULL RESET_SETTINGS_SOFT
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.resetSettings = function(reset) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_STOPPED = 1;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_INITIALIZING = 2;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_PLAYING = 3;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_PAUSED = 4;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_SEEKING = 5;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_BUFFERING = 6;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_FINISHED = 7;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_STATE_DEINITIALIZING = 8;


/**
 * @return {DunePlugin.TypePlaybackState}
 */
DunePlugin.prototype.getPlaybackState = function() {};


/**
 * @param {string} mediaUrl see http://files.dune-hd.com/partners/sdk/media_url.txt for details
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.play = function(mediaUrl) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.stop = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns true if zero argument can be used in setSpeed() function or
 * pause() function can be called successfully.
 *
 * @return {boolean}
 */
DunePlugin.prototype.canPause = function() {
	return true;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.pause = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.resume = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Argument must be power of 2.
 * Argument:
 *  -8192..-512 - -32x..-2x
 *  -256        - -1x
 *  -128..-8    - -1/2x..-1/32x
 *  0           - paused
 *  8..128      - 1/32x..1/2x
 *  256         - 1x
 *  512..8192   - 2x..32x
 *
 * @param {number} speed
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setInitialSpeed = function(speed) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Result is always power of 2.
 * Result:
 *  -8192..-512 - -32x..-2x
 *  -256        - -1x
 *  -128..-8    - -1/2x..-1/32x
 *  0           - paused
 *  8..128      - 1/32x..1/2x
 *  256         - 1x
 *  512..8192   - 2x..32x
 *
 * @return {number}
 */
DunePlugin.prototype.getSpeed = function() {
	return -1;
};


/**
 * Argument must be power of 2.
 * Argument:
 *  -8192..-512 - -32x..-2x
 *  -256        - -1x
 *  -128..-8    - -1/2x..-1/32x
 *  0           - paused
 *  8..128      - 1/32x..1/2x
 *  256         - 1x
 *  512..8192   - 2x..32x
 *
 * @param {number} speed
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setSpeed = function(speed) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns true if length of media is known.
 * @return {boolean}
 */
DunePlugin.prototype.hasLength = function() {
	return true;
};


/**
 * 0..N - media length in seconds
 * @return {number}
 */
DunePlugin.prototype.getLengthInSeconds = function() {
	return -1;
};


/**
 * @param {number} seconds 0..N - position in seconds
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setInitialPositionInSeconds = function(seconds) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number} 0..N - current position in seconds
 */
DunePlugin.prototype.getPositionInSeconds = function() {
	return -1;
};


/**
 * @param {number} seconds 0..N - position in seconds
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setPositionInSeconds = function(seconds) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @param {number} speed
 *   -8192..-512 - -32x..-2x
 *   -256        - -1x
 *   -128..-8    - -1/2x..-1/32x
 *   0           - paused
 *   8..128      - 1/32x..1/2x
 *   256         - 1x
 *   512..8192   - 2x..32x
 * @param {number} seconds 0..N - position in seconds
 *
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setSpeedAndPositionInSeconds = function(speed, seconds) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number} 0..100 - current volume in percents
 */
DunePlugin.prototype.getVolume = function() {
	return -1;
};


/**
 * @param {number} volume 0..100 - volume in percents
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setVolume = function(volume) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {boolean}
 */
DunePlugin.prototype.isMuteEnabled = function() {
	return true;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.enableMute = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.disableMute = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Result:
 * String "[ ]" if list of tracks is empty or error occured.
 * String in format "[ { index: <INDEX>, lang: <LANG>, codec: <CODEC>,
 *   pid: <PID> }, ... ]",
 * where <INDEX> is int, <LANG>, <CODEC> are strings, <PID> is int
 * @return {string}
 */
DunePlugin.prototype.getAudioTracksDescription = function() {
	return '';
};


/**
 * @return {number} 0..N - current audio track index
 */
DunePlugin.prototype.getAudioTrack = function() {
	return -1;
};


/**
 * @param {number} track 0..N - audio track index
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setAudioTrack = function(track) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.DIGITAL_AUDIO_OUTPUT_PCM = 0;


/** @type {number} */
DunePlugin.prototype.DIGITAL_AUDIO_OUTPUT_BITSTREAM = 1;


/**
 * Result:
 *  DIGITAL_AUDIO_OUTPUT_PCM = 0
 *  DIGITAL_AUDIO_OUTPUT_BITSTREAM = 1
 * @return {number}
 */
DunePlugin.prototype.getDigitalAudioOutput = function() {
	return -1;
};


/**
 * @param {number} output DIGITAL_AUDIO_OUTPUT_PCM || DIGITAL_AUDIO_OUTPUT_BITSTREAM
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setDigitalAudioOutput = function(output) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns default audio language stored in STB settings.
 Result:
 3 letter language code
 see section "Supported languages" below
 * @return {string}
 */
DunePlugin.prototype.getDefaultAudioLanguage = function() {
	return '';
};


/**
 * Stores default audio language in STB settings.
 Argument:
 3 letter language code
 see section "Supported languages" below
 * @param {string} language
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setDefaultAudioLanguage = function(language) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Result:
 String "[ ]" if list of tracks is empty or error occured.
 String in format "[ { index: <INDEX>, lang: <LANG>, codec: <CODEC>,
pid: <PID> }, ... ]",
 where <INDEX> is int, <LANG>, <CODEC> are strings, <PID> is int
 * @return {string}
 */
DunePlugin.prototype.getSubtitleTracksDescription = function() {
	return '';
};


/**
 * @return {number} 0..N - current subtitle track index
 */
DunePlugin.prototype.getSubtitleTrack = function() {
	return -1;
};


/**
 * @param {number} track 0..N - subtitle track index
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setSubtitleTrack = function(track) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.disableSubtitleTrack = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number} 0xXXXXXX - current color key
 */
DunePlugin.prototype.getColorKey = function() {
	return -1;
};


/**
 * @param {number} color 0xXXXXXX - color key
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setColorKey = function(color) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Disables color key.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.disableColorKey = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {boolean}
 */
DunePlugin.prototype.isVideoEnabled = function() {
	return true;
};


/**
 * Enables and shows video window.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.enableVideo = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Disables and hides video window.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.disableVideo = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {boolean}
 */
DunePlugin.prototype.isVideoOnTop = function() {
	return true;
};


/**
 * Puts video window above OSD.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.enableVideoOnTop = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Puts video window below OSD.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.disableVideoOnTop = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {boolean}
 */
DunePlugin.prototype.isWindowFullScreen = function() {
	return true;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.enableWindowFullScreen = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getWindowRectX = function() {
	return -1;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getWindowRectY = function() {
	return -1;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getWindowRectWidth = function() {
	return -1;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getWindowRectHeight = function() {
	return -1;
};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setWindowRect = function(x, y, width, height) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getClipRectX = function() {
	return -1;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getClipRectY = function() {
	return -1;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getClipRectWidth = function() {
	return -1;
};


/**
 * @return {number}
 */
DunePlugin.prototype.getClipRectHeight = function() {
	return -1;
};


/**
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setClipRect = function(x, y, width, height) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.getVideoWidth = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.getVideoHeight = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.VIDEO_CONNECTOR_HDMI = 0;


/** @type {number} */
DunePlugin.prototype.VIDEO_CONNECTOR_COMPONENT = 1;


/** @type {number} */
DunePlugin.prototype.VIDEO_CONNECTOR_COMPOSITE = 2;


/** @type {number} */
DunePlugin.prototype.VIDEO_CONNECTOR_SVIDEO = 3;


/**
 * Result:
 * VIDEO_CONNECTOR_HDMI = 0
 * VIDEO_CONNECTOR_COMPONENT = 1
 * VIDEO_CONNECTOR_COMPOSITE = 2
 * VIDEO_CONNECTOR_SVIDEO = 3
 * @return {DunePlugin.prototype.TypeVideoConnector}
 */
DunePlugin.prototype.getVideoConnector = function() {};


/**
 * @param {number} connector
 * Argument:
 * VIDEO_CONNECTOR_HDMI = 0
 * VIDEO_CONNECTOR_COMPONENT = 1
 * VIDEO_CONNECTOR_COMPOSITE = 2
 * VIDEO_CONNECTOR_SVIDEO = 3
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setVideoConnector = function(connector) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_NTSC = 0;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_480P = 1;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_PAL = 2;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_576P = 3;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_720P50 = 4;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_720P60 = 5;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_1080I50 = 6;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_1080I60 = 7;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_1080P23 = 8;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_1080P24 = 9;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_1080P50 = 10;


/** @type {number} */
DunePlugin.prototype.VIDEO_MODE_1080P60 = 11;


/**
 * Result:
 * VIDEO_MODE_NTSC = 0
 * VIDEO_MODE_480P = 1
 * VIDEO_MODE_PAL = 2
 * VIDEO_MODE_576P = 3
 * VIDEO_MODE_720P50 = 4
 * VIDEO_MODE_720P60 = 5
 * VIDEO_MODE_1080I50 = 6
 * VIDEO_MODE_1080I60 = 7
 * VIDEO_MODE_1080P23 = 8
 * VIDEO_MODE_1080P24 = 9
 * VIDEO_MODE_1080P50 = 10
 * VIDEO_MODE_1080P60 = 11
 * @return {number}
 */
DunePlugin.prototype.getVideoMode = function() {
	return -1;
};


/**
 * @param {number} mode
 * Argument:
 * VIDEO_MODE_NTSC = 0
 * VIDEO_MODE_480P = 1
 * VIDEO_MODE_PAL = 2
 * VIDEO_MODE_576P = 3
 * VIDEO_MODE_720P50 = 4
 * VIDEO_MODE_720P60 = 5
 * VIDEO_MODE_1080I50 = 6
 * VIDEO_MODE_1080I60 = 7
 * VIDEO_MODE_1080P23 = 8
 * VIDEO_MODE_1080P24 = 9
 * VIDEO_MODE_1080P50 = 10
 * VIDEO_MODE_1080P60 = 11
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setVideoMode = function(mode) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.ASPECT_RATIO_AUTO = 0;


/** @type {number} */
DunePlugin.prototype.ASPECT_RATIO_16_9 = 1;


/** @type {number} */
DunePlugin.prototype.ASPECT_RATIO_4_3 = 2;


/**
 * Result:
 * ASPECT_RATIO_AUTO = 0
 * ASPECT_RATIO_16_9 = 1
 * ASPECT_RATIO_4_3 = 2
 * @return {DunePlugin.TypeAspectRatio}
 */
DunePlugin.prototype.getAspectRatio = function() {};


/**
 * @param {DunePlugin.TypeAspectRatio} ratio
 * Argument:
 * ASPECT_RATIO_AUTO = 0
 * ASPECT_RATIO_16_9 = 1
 * ASPECT_RATIO_4_3 = 2
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setAspectRatio = function(ratio) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_NORMAL = 0;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_ENLARGE = 1;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_MAKE_WIDER = 2;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_NON_LINEAR_STRETCH = 3;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_NON_LINEAR_STRETCH_TO_FULL_SCREEN = 4;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_MAKE_TALLER = 5;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_CUT_EDGES = 6;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_FULL_SCREEN = 8;


/** @type {number} */
DunePlugin.prototype.VIDEO_ZOOM_STRETCH_TO_FULL_SCREEN = 9;


/**
 * Result:
 * VIDEO_ZOOM_NORMAL = 0
 * VIDEO_ZOOM_ENLARGE = 1
 * VIDEO_ZOOM_MAKE_WIDER = 2
 * VIDEO_ZOOM_NON_LINEAR_STRETCH = 3
 * VIDEO_ZOOM_NON_LINEAR_STRETCH_TO_FULL_SCREEN = 4
 * VIDEO_ZOOM_MAKE_TALLER = 5
 * VIDEO_ZOOM_CUT_EDGES = 6
 * VIDEO_ZOOM_FULL_SCREEN = 8 // это не ошибка
 * VIDEO_ZOOM_STRETCH_TO_FULL_SCREEN = 9
 * @return {DunePlugin.TypeVideoZoom}
 */
DunePlugin.prototype.getVideoZoom = function() {};


/**
 * @param {DunePlugin.TypeVideoZoom} zoom
 * Argument:
 * VIDEO_ZOOM_NORMAL = 0
 * VIDEO_ZOOM_ENLARGE = 1
 * VIDEO_ZOOM_MAKE_WIDER = 2
 * VIDEO_ZOOM_NON_LINEAR_STRETCH = 3
 * VIDEO_ZOOM_NON_LINEAR_STRETCH_TO_FULL_SCREEN = 4
 * VIDEO_ZOOM_MAKE_TALLER = 5
 * VIDEO_ZOOM_CUT_EDGES = 6
 * VIDEO_ZOOM_FULL_SCREEN = 8
 * VIDEO_ZOOM_STRETCH_TO_FULL_SCREEN = 9
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setVideoZoom = function(zoom) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number} 0..255 - current alpha level
 */
DunePlugin.prototype.getBrowserAlphaLevel = function() {
	return -1;
};


/**
 * @param {number} level 0..255 - alpha level
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setBrowserAlphaLevel = function(level) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.SCREEN_SIZE_AUTO = 0;


/** @type {number} */
DunePlugin.prototype.SCREEN_SIZE_720_480 = 1;


/** @type {number} */
DunePlugin.prototype.SCREEN_SIZE_720_576 = 2;


/** @type {number} */
DunePlugin.prototype.SCREEN_SIZE_1280_720 = 3;


/** @type {number} */
DunePlugin.prototype.SCREEN_SIZE_1920_1080 = 4;


/**
 * Result:
 * SCREEN_SIZE_AUTO = 0
 * SCREEN_SIZE_720_480 = 1
 * SCREEN_SIZE_720_576 = 2
 * SCREEN_SIZE_1280_720 = 3
 * SCREEN_SIZE_1920_1080 = 4
 * @return {number}
 */
DunePlugin.prototype.getScreenSize = function() {
	return -1;
};


/**
 * @param {number} size
 * Argument:
 * SCREEN_SIZE_AUTO = 0
 * SCREEN_SIZE_720_480 = 1
 * SCREEN_SIZE_720_576 = 2
 * SCREEN_SIZE_1280_720 = 3
 * SCREEN_SIZE_1920_1080 = 4
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setScreenSize = function(size) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns home page URL got from DHCP server. Can be used for loading
 * initial page on device start.
 * @return {string}
 */
DunePlugin.prototype.getHomePage = function() {
	return '';
};


/** @type {number} */
DunePlugin.prototype.EXIT_BROWSER_MODE_RESTART = 0;


/** @type {number} */
DunePlugin.prototype.EXIT_BROWSER_MODE_STANDBY = 1;


/** @type {number} */
DunePlugin.prototype.EXIT_BROWSER_MODE_POWER_OFF = 2;


/** @type {number} */
DunePlugin.prototype.EXIT_BROWSER_MODE_CLOSE = 1000;


/**
 * Exits or restarts Web browser without restarting device. Can be used
 * for applying audio and video settings that cannot be changed in run-time.
 *
 * @param {number} mode
 * EXIT_BROWSER_MODE_RESTART
 * EXIT_BROWSER_MODE_STANDBY
 * EXIT_BROWSER_MODE_POWER_OFF
 * EXIT_BROWSER_MODE_CLOSE
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.exitBrowser = function(mode) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @param {string=} opt_returnUrl optional URL that should be loaded after return to
 * browser, if URL is not specified default URL is loaded
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.launchNativeUi = function(opt_returnUrl) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @param {string} nativeUrl optional URL to be loaded by native UI. The following
 * values are supported:
 *   root://
 *   setup://network
 *   setup://network:::standalone=1
 * @param {string} returnUrl optional URL that should be loaded after return to
 * browser, if URL is not specified default URL is loaded
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.launchNativeUiExt = function(nativeUrl, returnUrl) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.BROWSER_PROXY_TYPE_SSL = 1;


/** @type {number} */
DunePlugin.prototype.BROWSER_PROXY_TYPE_HTTP = 2;


/**
 * Result:
 String "[ ]" if list of proxies is empty or error occured.
 String in format "[ { type: <TYPE>, host: <HOST>, port: <PORT>,
user: <USER>, password: <PASSWORD>, exceptions: <EXCEPTIONS> },
 ... ]",
 where <TYPE> is BROWSER_PROXY_TYPE_SSL or BROWSER_PROXY_TYPE_HTTP,
 <PORT> is int, <HOST>, <USER>, <PASSWORD>, <EXCEPTIONS> are
 strings. <EXCEPTIONS> is a list of host names that are communicated
 directly without using browser proxy. Space is used as separator.
 * @return {string}
 */
DunePlugin.prototype.getBrowserProxies = function() {
	return '';
};


/**
 *
 * @param {number} type BROWSER_PROXY_TYPE_SSL or BROWSER_PROXY_TYPE_HTTP
 * @param {string} host
 * @param {number} port
 * @param {string} user
 * @param {string} password
 * @param {string} exceptions list of host names that are communicated directly
 *   without using browser proxy. Space should be used as separator.
 *   Pass empty string to disable exceptions.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setBrowserProxy = function(type, host, port, user, password, exceptions) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.removeBrowserProxies = function() {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @return {number} 50..500 - RC auto-repeat interval in milliseconds
 */
DunePlugin.prototype.getRcAutoRepeatPeriod = function() {
	return -1;
};


/**
 * @param {number} period 50..500 - RC auto-repeat interval in milliseconds
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setRcAutoRepeatPeriod = function(period) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns current status of all supported network interfaces.
 Result:
 String "[ ]" if list of interfaces is empty or error occured.
 String in format
 "[ {
interface: <INTERFACE>,
ipAddress: <IP>,
macAddress: <MAC>,
connection: <CONNECTION>,
up: <UP>,
running: <RUNNING> },
 ... ]",
 where <INTERFACE>, <IP>, <MAC>, <CONNECTION> are strings,
 <UP>, <RUNNING> are ints.
 * @return {string}
 */
DunePlugin.prototype.getNetworkStatus = function() {
	return '';
};


/**
 * Starts scanning of WiFi networks, doesn't wait until scanning is
 * finished. Scanning finishes if some WiFi networks are found or given
 * timeout in seconds is exceeded.
 *
 * @param {number} timeout
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.scanForWifiNetworks = function(timeout) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns list of WiFi networks found during scanning.
 Result:
 String "[ ]" if list of networks is empty or error occured.
 String in format "[ { ssid: <SSID>, security: <SECURITY> }, ... ]",
 where <SSID> is string, <SECURITY> is enum.
 * @return {string}
 */
DunePlugin.prototype.getWifiNetworksDescription = function() {
	return '';
};


/** @type {number} */
DunePlugin.prototype.NETWORK_CONNECTION_ETHERNET = 0;


/** @type {number} */
DunePlugin.prototype.NETWORK_CONNECTION_GIGAETH = 1;


/** @type {number} */
DunePlugin.prototype.NETWORK_CONNECTION_WIFI = 2;


/** @type {number} */
DunePlugin.prototype.NETWORK_CONNECTION_PPPOE = 3;


/** @type {number} */
DunePlugin.prototype.NETWORK_CONNECTION_NONE = 4;


/** @type {number} */
DunePlugin.prototype.NETWORK_MODE_AUTO = 0;


/** @type {number} */
DunePlugin.prototype.NETWORK_MODE_AUTO_MANUAL_DNS = 1;


/** @type {number} */
DunePlugin.prototype.NETWORK_MODE_MANUAL = 2;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_NONE = 0;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WEP_64_BIT_ASCII = 1;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WEP_64_BIT_HEX = 2;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WEP_128_BIT_ASCII = 3;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WEP_128_BIT_HEX = 4;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WPA_TKIP = 5;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WPA_AES = 6;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WPA2_TKIP = 7;


/** @type {number} */
DunePlugin.prototype.WIFI_SECURITY_WPA2_AES = 8;


/** @type {number} */
DunePlugin.prototype.WIFI_AP_MODE_DISABLED = 0;


/** @type {number} */
DunePlugin.prototype.WIFI_AP_MODE_ROUTER = 1;


/** @type {number} */
DunePlugin.prototype.PPPOE_DNS_MODE_AUTO = 0;


/** @type {number} */
DunePlugin.prototype.PPPOE_DNS_MODE_MANUAL = 1;


/** @type {number} */
DunePlugin.prototype.PPPOE_DHCP_DISABLED = 0;


/**
 * Sets given network configuration.
 Argument:
 struct networkConfiguration
 {
enum connection;
enum mode;
string ipAddress;
string mask;
string gateway;
string dns1;
string dns2;
string wifiSsid;
enum wifiSecurity;
string wifiPassword;
enum wifiApMode;
string wifiApSsid;
string wifiApPassword;
string pppoeLogin;
string pppoePassword;
enum pppoeDnsMode;
enum pppoeDhcp;
}
 "connection" enum:
 NETWORK_CONNECTION_ETHERNET = 0
 NETWORK_CONNECTION_GIGAETH = 1
 NETWORK_CONNECTION_WIFI = 2
 NETWORK_CONNECTION_PPPOE = 3
 NETWORK_CONNECTION_NONE =4
 "mode" enum:
 NETWORK_MODE_AUTO = 0
 NETWORK_MODE_AUTO_MANUAL_DNS = 1
 NETWORK_MODE_MANUAL = 2
 "wifiSecurity" enum:
 WIFI_SECURITY_NONE = 0
 WIFI_SECURITY_WEP_64_BIT_ASCII = 1
 WIFI_SECURITY_WEP_64_BIT_HEX = 2
 WIFI_SECURITY_WEP_128_BIT_ASCII = 3
 WIFI_SECURITY_WEP_128_BIT_HEX = 4
 WIFI_SECURITY_WPA_TKIP = 5
 WIFI_SECURITY_WPA_AES = 6
 WIFI_SECURITY_WPA2_TKIP = 7
 WIFI_SECURITY_WPA2_AES = 8
 "wifiApMode" enum:
 WIFI_AP_MODE_DISABLED = 0
 WIFI_AP_MODE_ROUTER = 1
 "pppoeDnsMode" enum:
 PPPOE_DNS_MODE_AUTO = 0
 PPPOE_DNS_MODE_MANUAL = 1
 "pppoeDhcp" enum:
 PPPOE_DHCP_DISABLED = 0

 * @param {*} config networkConfiguration struct
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setNetworkConfiguration = function(config) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * Returns all network settings.
 * Result:
 Empty string if error occured.
 String in format
 "( {
connection: <CONNECTION>,
mode: <MODE>,
ipAddress: <IP>,
mask: <IP>,
gateway: <IP>,
dns1: <IP>,
dns2: <IP>,
wifiSsid: <SSID>,
wifiSecurity: <SECURITY>,
wifiPassword: <PASSWORD>,
wifiApMode: <APMODE>,
wifiApSsid: <SSID>,
wifiApPassword: <PASSWORD>,
pppoeLogin: <LOGIN>,
pppoePassword: <PASSWORD>,
pppoeDnsMode: <DNSMODE>,
pppoeDhcp: <DHCPMODE>
} )",
 where <IP>, <SSID>, <PASSWORD>, <LOGIN> are strings,
 <SECURITY>, <APMODE>, <DNSMODE>, <DHCPMODE> are enums.
 *
 * @return {string}
 */
DunePlugin.prototype.getNetworkConfiguration = function() {
	return '';
};


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_12_00 = 0;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_11_00 = 1;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_10_00 = 2;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_09_00 = 3;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_08_00 = 4;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_07_00 = 5;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_06_00 = 6;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_05_00 = 7;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_04_00 = 8;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_03_30 = 9;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_03_00 = 10;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_02_00 = 11;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_MINUS_01_00 = 12;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT = 13;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_01_00 = 14;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_02_00 = 15;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_03_00 = 16;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_03_30 = 17;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_04_00 = 18;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_04_30 = 19;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_05_00 = 20;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_05_30 = 21;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_05_45 = 22;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_06_00 = 23;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_06_30 = 24;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_07_00 = 25;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_08_00 = 26;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_09_00 = 27;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_09_30 = 28;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_10_00 = 29;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_11_00 = 30;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_12_00 = 31;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_GMT_PLUS_13_00 = 32;


/** @type {number} */
DunePlugin.prototype.TIME_ZONE_AUTO = 33;


/**
 * Returns current time zone.
 * @return {number} See section "Supported time zones" below.
 */
DunePlugin.prototype.getTimeZone = function() {
	return -1;
};


/**
 * Sets time zone. To apply changes browser need to be restarted.
 * TIME_ZONE_GMT_MINUS_12_00 = 0
 * TIME_ZONE_GMT_MINUS_11_00 = 1
 * TIME_ZONE_GMT_MINUS_10_00 = 2
 * TIME_ZONE_GMT_MINUS_09_00 = 3
 * TIME_ZONE_GMT_MINUS_08_00 = 4
 * TIME_ZONE_GMT_MINUS_07_00 = 5
 * TIME_ZONE_GMT_MINUS_06_00 = 6
 * TIME_ZONE_GMT_MINUS_05_00 = 7
 * TIME_ZONE_GMT_MINUS_04_00 = 8
 * TIME_ZONE_GMT_MINUS_03_30 = 9
 * TIME_ZONE_GMT_MINUS_03_00 = 10
 * TIME_ZONE_GMT_MINUS_02_00 = 11
 * TIME_ZONE_GMT_MINUS_01_00 = 12
 * TIME_ZONE_GMT            = 13
 * TIME_ZONE_GMT_PLUS_01_00 = 14
 * TIME_ZONE_GMT_PLUS_02_00 = 15
 * TIME_ZONE_GMT_PLUS_03_00 = 16
 * TIME_ZONE_GMT_PLUS_03_30 = 17
 * TIME_ZONE_GMT_PLUS_04_00 = 18
 * TIME_ZONE_GMT_PLUS_04_30 = 19
 * TIME_ZONE_GMT_PLUS_05_00 = 20
 * TIME_ZONE_GMT_PLUS_05_30 = 21
 * TIME_ZONE_GMT_PLUS_05_45 = 22
 * TIME_ZONE_GMT_PLUS_06_00 = 23
 * TIME_ZONE_GMT_PLUS_06_30 = 24
 * TIME_ZONE_GMT_PLUS_07_00 = 25
 * TIME_ZONE_GMT_PLUS_08_00 = 26
 * TIME_ZONE_GMT_PLUS_09_00 = 27
 * TIME_ZONE_GMT_PLUS_09_30 = 28
 * TIME_ZONE_GMT_PLUS_10_00 = 29
 * TIME_ZONE_GMT_PLUS_11_00 = 30
 * TIME_ZONE_GMT_PLUS_12_00 = 31
 * TIME_ZONE_GMT_PLUS_13_00 = 32
 * TIME_ZONE_AUTO           = 33
 * @param {number} zone See section "Supported time zones" below.
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setTimeZone = function(zone) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.DAYLIGHT_SAVING_TIME_OFF = 1;


/** @type {number} */
DunePlugin.prototype.DAYLIGHT_SAVING_TIME_AUTO = 0;


/**
 * @return {number} DAYLIGHT_SAVING_TIME_OFF == 1 or DAYLIGHT_SAVING_TIME_AUTO == 0
 */
DunePlugin.prototype.getDaylightSavingTime = function() {
	return -1;
};


/**
 * @param {number} time DAYLIGHT_SAVING_TIME_OFF == 1 or DAYLIGHT_SAVING_TIME_AUTO == 0
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setDaylightSavingTime = function(time) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_NO_EVENT = 1;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_MEDIA_DESCRIPTION_CHANGED = 2;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_MEDIA_READ_STALLED = 3;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_END_OF_MEDIA = 4;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_FORMAT_NOT_SUPPORTED = 5;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_ERROR_INTERNAL_ERROR = 6;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_READ_FAILED = 7;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_OPEN_FAILED = 8;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_EXTERNAL_ACTION = 9;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED = 10;


/** @type {number} */
DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_PERMISSION_DENIED = 11;


/**
 * @param {function(
 *      DunePlugin.TypePlaybackState,
 *      DunePlugin.TypePlaybackState,
 *      DunePlugin.TypePlaybackEvent
 *      )} callback args: previousState, currentState, lastEvent
 * @return {DunePlugin.TypeRC}
 */
DunePlugin.prototype.setPlaybackEventCallback = function(callback) {
	return DunePlugin.TypeRC.NOT_INITIALIZED;
};


/**
 * @enum {number}
 */
DunePlugin.TypeRC = {
	OK: DunePlugin.prototype.OK,
	ALREADY_INITIALIZED: DunePlugin.prototype.ALREADY_INITIALIZED,
	NOT_INITIALIZED: DunePlugin.prototype.NOT_INITIALIZED,
	POWER_OFF: DunePlugin.prototype.POWER_OFF,
	ERROR: DunePlugin.prototype.ERROR,
	INVALID_ARGUMENT: DunePlugin.prototype.INVALID_ARGUMENT,
	NOT_SUPPORTED: DunePlugin.prototype.NOT_SUPPORTED
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeStandbyMode = {
	STANDBY_MODE_OFF: DunePlugin.prototype.STANDBY_MODE_OFF,
	STANDBY_MODE_ON: DunePlugin.prototype.STANDBY_MODE_ON
};


/**
 * @enum {number}
 */
DunePlugin.TypePlaybackState = {
	PLAYBACK_STATE_STOPPED: DunePlugin.prototype.PLAYBACK_STATE_STOPPED,
	PLAYBACK_STATE_INITIALIZING: DunePlugin.prototype.PLAYBACK_STATE_INITIALIZING,
	PLAYBACK_STATE_PLAYING: DunePlugin.prototype.PLAYBACK_STATE_PLAYING,
	PLAYBACK_STATE_PAUSED: DunePlugin.prototype.PLAYBACK_STATE_PAUSED,
	PLAYBACK_STATE_SEEKING: DunePlugin.prototype.PLAYBACK_STATE_SEEKING,
	PLAYBACK_STATE_BUFFERING: DunePlugin.prototype.PLAYBACK_STATE_BUFFERING,
	PLAYBACK_STATE_FINISHED: DunePlugin.prototype.PLAYBACK_STATE_FINISHED,
	PLAYBACK_STATE_DEINITIALIZING: DunePlugin.prototype.PLAYBACK_STATE_DEINITIALIZING
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeResetSettings = {
	RESET_SETTINGS_FULL: DunePlugin.prototype.RESET_SETTINGS_FULL,
	RESET_SETTINGS_SOFT: DunePlugin.prototype.RESET_SETTINGS_SOFT
};


/**
 *  @enum {number}
 */
DunePlugin.prototype.TypeDigitalAudioOutput = {
	DIGITAL_AUDIO_OUTPUT_PCM: DunePlugin.prototype.DIGITAL_AUDIO_OUTPUT_PCM,
	DIGITAL_AUDIO_OUTPUT_BITSTREAM: DunePlugin.prototype.DIGITAL_AUDIO_OUTPUT_BITSTREAM
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeVideoConnector = {
	VIDEO_CONNECTOR_HDMI: DunePlugin.prototype.VIDEO_CONNECTOR_HDMI,
	VIDEO_CONNECTOR_COMPONENT: DunePlugin.prototype.VIDEO_CONNECTOR_COMPONENT,
	VIDEO_CONNECTOR_COMPOSITE: DunePlugin.prototype.VIDEO_CONNECTOR_COMPOSITE,
	VIDEO_CONNECTOR_SVIDEO: DunePlugin.prototype.VIDEO_CONNECTOR_SVIDEO
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeVideoMode = {
	VIDEO_MODE_NTSC: DunePlugin.prototype.VIDEO_MODE_NTSC,
	VIDEO_MODE_480P: DunePlugin.prototype.VIDEO_MODE_480P,
	VIDEO_MODE_PAL: DunePlugin.prototype.VIDEO_MODE_PAL,
	VIDEO_MODE_576P: DunePlugin.prototype.VIDEO_MODE_576P,
	VIDEO_MODE_720P50: DunePlugin.prototype.VIDEO_MODE_720P50,
	VIDEO_MODE_720P60: DunePlugin.prototype.VIDEO_MODE_720P60,
	VIDEO_MODE_1080I50: DunePlugin.prototype.VIDEO_MODE_1080I50,
	VIDEO_MODE_1080I60: DunePlugin.prototype.VIDEO_MODE_1080I60,
	VIDEO_MODE_1080P23: DunePlugin.prototype.VIDEO_MODE_1080P23,
	VIDEO_MODE_1080P24: DunePlugin.prototype.VIDEO_MODE_1080P24,
	VIDEO_MODE_1080P50: DunePlugin.prototype.VIDEO_MODE_1080P50,
	VIDEO_MODE_1080P60: DunePlugin.prototype.VIDEO_MODE_1080P60
};


/**
 * @enum {number}
 */
DunePlugin.TypeAspectRatio = {
	ASPECT_RATIO_AUTO: DunePlugin.prototype.ASPECT_RATIO_AUTO,
	ASPECT_RATIO_16_9: DunePlugin.prototype.ASPECT_RATIO_16_9,
	ASPECT_RATIO_4_3: DunePlugin.prototype.ASPECT_RATIO_4_3
};


/**
 * @enum {number}
 */
DunePlugin.TypeVideoZoom = {
	VIDEO_ZOOM_NORMAL: DunePlugin.prototype.VIDEO_ZOOM_NORMAL,
	VIDEO_ZOOM_ENLARGE: DunePlugin.prototype.VIDEO_ZOOM_ENLARGE,
	VIDEO_ZOOM_MAKE_WIDER: DunePlugin.prototype.VIDEO_ZOOM_MAKE_WIDER,
	VIDEO_ZOOM_NON_LINEAR_STRETCH: DunePlugin.prototype.VIDEO_ZOOM_NON_LINEAR_STRETCH,
	VIDEO_ZOOM_NON_LINEAR_STRETCH_TO_FULL_SCREEN: DunePlugin.prototype.VIDEO_ZOOM_NON_LINEAR_STRETCH_TO_FULL_SCREEN,
	VIDEO_ZOOM_MAKE_TALLER: DunePlugin.prototype.VIDEO_ZOOM_MAKE_TALLER,
	VIDEO_ZOOM_CUT_EDGES: DunePlugin.prototype.VIDEO_ZOOM_CUT_EDGES,
	VIDEO_ZOOM_FULL_SCREEN: DunePlugin.prototype.VIDEO_ZOOM_FULL_SCREEN,
	VIDEO_ZOOM_STRETCH_TO_FULL_SCREEN: DunePlugin.prototype.VIDEO_ZOOM_STRETCH_TO_FULL_SCREEN
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeScreenSize = {
	SCREEN_SIZE_AUTO: DunePlugin.prototype.SCREEN_SIZE_AUTO,
	SCREEN_SIZE_720_480: DunePlugin.prototype.SCREEN_SIZE_720_480,
	SCREEN_SIZE_720_576: DunePlugin.prototype.SCREEN_SIZE_720_576,
	SCREEN_SIZE_1280_720: DunePlugin.prototype.SCREEN_SIZE_1280_720,
	SCREEN_SIZE_1920_1080: DunePlugin.prototype.SCREEN_SIZE_1920_1080
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeExitBrowser = {
	EXIT_BROWSER_MODE_RESTART: DunePlugin.prototype.EXIT_BROWSER_MODE_RESTART,
	EXIT_BROWSER_MODE_STANDBY: DunePlugin.prototype.EXIT_BROWSER_MODE_STANDBY,
	EXIT_BROWSER_MODE_POWER_OFF: DunePlugin.prototype.EXIT_BROWSER_MODE_POWER_OFF,
	EXIT_BROWSER_MODE_CLOSE: DunePlugin.prototype.EXIT_BROWSER_MODE_CLOSE
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeBrowserProxy = {
	BROWSER_PROXY_TYPE_SSL: DunePlugin.prototype.BROWSER_PROXY_TYPE_SSL,
	BROWSER_PROXY_TYPE_HTTP: DunePlugin.prototype.BROWSER_PROXY_TYPE_HTTP
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeNetworkConnection = {
	NETWORK_CONNECTION_ETHERNET: DunePlugin.prototype.NETWORK_CONNECTION_ETHERNET,
	NETWORK_CONNECTION_GIGAETH: DunePlugin.prototype.NETWORK_CONNECTION_GIGAETH,
	NETWORK_CONNECTION_WIFI: DunePlugin.prototype.NETWORK_CONNECTION_WIFI,
	NETWORK_CONNECTION_PPPOE: DunePlugin.prototype.NETWORK_CONNECTION_PPPOE,
	NETWORK_CONNECTION_NONE: DunePlugin.prototype.NETWORK_CONNECTION_NONE
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeNetworkMode = {
	NETWORK_MODE_AUTO: DunePlugin.prototype.NETWORK_MODE_AUTO,
	NETWORK_MODE_AUTO_MANUAL_DNS: DunePlugin.prototype.NETWORK_MODE_AUTO_MANUAL_DNS,
	NETWORK_MODE_MANUAL: DunePlugin.prototype.NETWORK_MODE_MANUAL
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeWifiSecurity = {
	WIFI_SECURITY_NONE: DunePlugin.prototype.WIFI_SECURITY_NONE,
	WIFI_SECURITY_WEP_64_BIT_ASCII: DunePlugin.prototype.WIFI_SECURITY_WEP_64_BIT_ASCII,
	WIFI_SECURITY_WEP_64_BIT_HEX: DunePlugin.prototype.WIFI_SECURITY_WEP_64_BIT_HEX,
	WIFI_SECURITY_WEP_128_BIT_ASCII: DunePlugin.prototype.WIFI_SECURITY_WEP_128_BIT_ASCII,
	WIFI_SECURITY_WEP_128_BIT_HEX: DunePlugin.prototype.WIFI_SECURITY_WEP_128_BIT_HEX,
	WIFI_SECURITY_WPA_TKIP: DunePlugin.prototype.WIFI_SECURITY_WPA_TKIP,
	WIFI_SECURITY_WPA_AES: DunePlugin.prototype.WIFI_SECURITY_WPA_AES,
	WIFI_SECURITY_WPA2_TKIP: DunePlugin.prototype.WIFI_SECURITY_WPA2_TKIP,
	WIFI_SECURITY_WPA2_AES: DunePlugin.prototype.WIFI_SECURITY_WPA2_AES
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeAPMode = {
	WIFI_AP_MODE_DISABLED: DunePlugin.prototype.WIFI_AP_MODE_DISABLED,
	WIFI_AP_MODE_ROUTER: DunePlugin.prototype.WIFI_AP_MODE_ROUTER
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypePppoeDnsMode = {
	PPPOE_DNS_MODE_AUTO: DunePlugin.prototype.PPPOE_DNS_MODE_AUTO,
	PPPOE_DNS_MODE_MANUAL: DunePlugin.prototype.PPPOE_DNS_MODE_MANUAL
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypePppoeDhcpDisabled = {
	PPPOE_DHCP_DISABLED: DunePlugin.prototype.PPPOE_DHCP_DISABLED
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeTimeZone = {
	TIME_ZONE_GMT_MINUS_12_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_12_00,
	TIME_ZONE_GMT_MINUS_11_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_11_00,
	TIME_ZONE_GMT_MINUS_10_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_10_00,
	TIME_ZONE_GMT_MINUS_09_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_09_00,
	TIME_ZONE_GMT_MINUS_08_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_08_00,
	TIME_ZONE_GMT_MINUS_07_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_07_00,
	TIME_ZONE_GMT_MINUS_06_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_06_00,
	TIME_ZONE_GMT_MINUS_05_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_05_00,
	TIME_ZONE_GMT_MINUS_04_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_04_00,
	TIME_ZONE_GMT_MINUS_03_30: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_03_30,
	TIME_ZONE_GMT_MINUS_03_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_03_00,
	TIME_ZONE_GMT_MINUS_02_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_02_00,
	TIME_ZONE_GMT_MINUS_01_00: DunePlugin.prototype.TIME_ZONE_GMT_MINUS_01_00,
	TIME_ZONE_GMT: DunePlugin.prototype.TIME_ZONE_GMT,
	TIME_ZONE_GMT_PLUS_01_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_01_00,
	TIME_ZONE_GMT_PLUS_02_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_02_00,
	TIME_ZONE_GMT_PLUS_03_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_03_00,
	TIME_ZONE_GMT_PLUS_03_30: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_03_30,
	TIME_ZONE_GMT_PLUS_04_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_04_00,
	TIME_ZONE_GMT_PLUS_04_30: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_04_30,
	TIME_ZONE_GMT_PLUS_05_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_05_00,
	TIME_ZONE_GMT_PLUS_05_30: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_05_30,
	TIME_ZONE_GMT_PLUS_05_45: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_05_45,
	TIME_ZONE_GMT_PLUS_06_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_06_00,
	TIME_ZONE_GMT_PLUS_06_30: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_06_30,
	TIME_ZONE_GMT_PLUS_07_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_07_00,
	TIME_ZONE_GMT_PLUS_08_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_08_00,
	TIME_ZONE_GMT_PLUS_09_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_09_00,
	TIME_ZONE_GMT_PLUS_09_30: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_09_30,
	TIME_ZONE_GMT_PLUS_10_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_10_00,
	TIME_ZONE_GMT_PLUS_11_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_11_00,
	TIME_ZONE_GMT_PLUS_12_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_12_00,
	TIME_ZONE_GMT_PLUS_13_00: DunePlugin.prototype.TIME_ZONE_GMT_PLUS_13_00,
	TIME_ZONE_AUTO: DunePlugin.prototype.TIME_ZONE_AUTO
};


/**
 * @enum {number}
 */
DunePlugin.prototype.TypeDayligthSavingTime = {
	DAYLIGHT_SAVING_TIME_AUTO: DunePlugin.prototype.DAYLIGHT_SAVING_TIME_AUTO,
	DAYLIGHT_SAVING_TIME_OFF: DunePlugin.prototype.DAYLIGHT_SAVING_TIME_OFF
};


/* eslint-disable max-len */
/**
 * @enum {number}
 */
DunePlugin.TypePlaybackEvent = {
	PLAYBACK_EVENT_NO_EVENT: DunePlugin.prototype.PLAYBACK_EVENT_NO_EVENT,
	PLAYBACK_EVENT_MEDIA_DESCRIPTION_CHANGED: DunePlugin.prototype.PLAYBACK_EVENT_MEDIA_DESCRIPTION_CHANGED,
	PLAYBACK_EVENT_MEDIA_READ_STALLED: DunePlugin.prototype.PLAYBACK_EVENT_MEDIA_READ_STALLED,
	PLAYBACK_EVENT_END_OF_MEDIA: DunePlugin.prototype.PLAYBACK_EVENT_END_OF_MEDIA,
	PLAYBACK_EVENT_ERROR_MEDIA_FORMAT_NOT_SUPPORTED: DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_FORMAT_NOT_SUPPORTED,
	PLAYBACK_EVENT_ERROR_INTERNAL_ERROR: DunePlugin.prototype.PLAYBACK_EVENT_ERROR_INTERNAL_ERROR,
	PLAYBACK_EVENT_ERROR_MEDIA_READ_FAILED: DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_READ_FAILED,
	PLAYBACK_EVENT_ERROR_MEDIA_OPEN_FAILED: DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_OPEN_FAILED,
	PLAYBACK_EVENT_EXTERNAL_ACTION: DunePlugin.prototype.PLAYBACK_EVENT_EXTERNAL_ACTION,
	PLAYBACK_EVENT_ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED: DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_PROTOCOL_NOT_SUPPORTED,
	PLAYBACK_EVENT_ERROR_MEDIA_PERMISSION_DENIED: DunePlugin.prototype.PLAYBACK_EVENT_ERROR_MEDIA_PERMISSION_DENIED
};
/* eslint-enable max-len */
