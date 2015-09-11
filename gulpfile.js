var gulp = require('gulp'),
	mocha = require('gulp-spawn-mocha');


gulp.task('test', function(cb) {
	gulp.src([ './test/**/*.js',
		'./test/*.js' ])
		.pipe(mocha({
            harmony: true,
            ignoreLeaks: false,
            reporter: 'spec',
            env: {'NODE_ENV': 'development'}
        }));
});
