/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');

var packageName = 'rl-components'; 

var locationConfig = {
	source: 'source',
	libraries: 'libraries',
	assets: 'assets',
	debug: 'debug',
	release: 'release',
};

gulpUtilities.build.config(gulp, packageName, locationConfig, false);
gulpUtilities.teamCity.config(gulp);
gulpUtilities.test.config(gulp, __dirname + '/karma.conf.js');

gulp.task('default', ['build']);