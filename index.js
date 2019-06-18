const path = require('path');
const fse = require('fs-extra');

const {AbstractPlatform} = require('zombiebox');


/**
 */
class PlatformDune extends AbstractPlatform {
	/**
	 * @override
	 */
	getName() {
		return 'dune';
	}

	/**
	 * @override
	 */
	getSourcesDir() {
		return path.join(__dirname, 'lib');
	}

	/**
	 * @override
	 */
	getConfig() {
		return {
			templates: [path.join(__dirname, 'templates')],
			include: [
				{
					name: 'Dune',
					externs: [
						path.join(__dirname, 'externs', 'plugin.js')
					]
				}
			],
			platforms: {
				dune: {
					opera: {
						enableVolumeOSD: false
					}
				}
			}
		};
	}

	/**
	 * @override
	 */
	async buildApp(application, distDir) {
		const config = application.getConfig();
		const duneConfig = config.platforms.dune;
		const packageJson = application.getAppPackageJson();

		const appName = config.project.name;
		const appVersion = packageJson.version;

		const wwwDir = path.join(distDir, 'src', 'www');
		const cgiDir = path.join(wwwDir, 'cgi-bin');
		const srcDir = path.join(wwwDir, '..');
		const archiveName = path.join(distDir, 'dune_plugin_' + appName + '_' + appVersion + '.zip');

		const buildHelper = application.getBuildHelper();

		await fse.ensureDir(cgiDir);

		const warnings = await buildHelper.writeIndexHTML(path.join(wwwDir, 'index.html'));
		await buildHelper.copyStaticFiles(wwwDir);
		await this._templateHelper.renderDir('dune', srcDir, {
			'pluginDirName': appName,
			'shortDesc': appName,
			'version': appVersion,
			'config': config,
			'enableVolumeOSD': Number(duneConfig.enableVolumeOSD)
		});

		await fse.copy(
			path.join(__dirname, 'cgi'),
			cgiDir
		);

		const archiveMap = buildHelper.addDirToArchiveMap(srcDir);

		await buildHelper.writeZIPArchive(archiveName, archiveMap);

		return warnings;
	}

	/**
	 * @override
	 */
	buildCLI(yargs, application) {
		super.buildCLI(yargs, application);
	}
}


module.exports = PlatformDune;
