gulp.task('less', function() {
	return gulp.src([paths.frontendRoot + '**/*.less','!'+paths.frontendRoot + 'node_modules/**/*.less'], {
		base: paths.frontendRoot
	}).pipe(changed(paths.frontendRoot, {
		extension: '.css'
	})).pipe($.plumber({
		errorHandler: console.log
	})).pipe($.less({
	})).pipe($.minifyCss({
		keepSpecialComments: 0
	})).pipe(gulp.dest(paths.frontendRoot));
});