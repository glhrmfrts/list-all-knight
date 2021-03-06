var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var stylus = require('gulp-stylus')
var connect = require('connect')
var serveStatic = require('serve-static')

var paths = {
	style: ['./src/stylus/*.styl'],
	js: [
		'./src/js/app.js', 
		'./src/js/services/*.js', 
		'./src/js/filters/*.js', 
		'./src/js/controllers/*.js'
	]
}

gulp.task('style', function() {
	return gulp.src(paths.style)
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest('./assets/css'))
})

gulp.task('js', function() {
	return gulp.src(paths.js)
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js'))
})

gulp.task('watch', function() {
	return gulp.watch(Array.prototype.concat.call(paths.style, paths.js), ['style', 'js'])
})

gulp.task('serve', function() {
	connect().use(serveStatic(__dirname)).listen(8080)
})

gulp.task('build', ['style', 'js'])

gulp.task('default', ['build', 'serve', 'watch'])