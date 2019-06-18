# 2.0.0 (18.06.2019)

* Code base migrated to ES6 modules
* Support ZombieBox 2.0

# v0.3.2 (19.05.2017)

## Fixes
* **#6159** Fixed wrong aspect-ratio support detection

# v0.3.1 (31.03.2017)

## Features
* **#6099** Disabled native volume control on Opera based firmware.

## Fixes
* **#6098** Fixed pause on old firmware.
* **#6095** Fixed playing after second calling method `Video#play`.

# v0.3.0 (16.03.2017)

## Fixes
* **#6004** Fixed aspect ratio namespace.

# v0.2.1 (16.03.2017)

## Features
* **#5044** Added factory method `zb.device.platforms.dune.factory.createDevice` for create Device instances.
  All global dependencies now located in factory method.
* **#5044** All *.es6 files renamed to *.js

# v0.2.0 (27.07.16)

## Features
* **#3996** Add ViewPort class which is responsible for managing display area sizes and aspect ratio
* **#4243** Implement getting current video url
* **#4423** Rename abstract Video class (zb.device.Video) to AbstractVideo (zb.device.AbstractVideo)
* **#4490** Transpiled client-side files to ES6

## Improvements
* **#4158** Refactor ViewPort
* **#4313** Removed call `_createViewPort()` method from Video constructor
* **#4505** Move calling parent class constructor to the top of child constructors
