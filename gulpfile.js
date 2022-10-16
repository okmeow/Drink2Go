import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import postcss from 'gulp-postcss';
import del from 'del'
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
}

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

const copyFonts = () => {
  return gulp.src('source/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'))
}

const copyIco = () => {
  return gulp.src('*.ico')
    .pipe(gulp.dest('build'))
}

const copyWebmanifest = () => {
  return gulp.src('*.webmanifest')
    .pipe(gulp.dest('build'))
}

const optimizeImages = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicons/*.png'])
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const createWebp = () => {
  return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicons/*.png'])
    .pipe(squoosh({webp: {}}))
    .pipe(gulp.dest('build/img'));
}

const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/sprite.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

const copySprite = () => {
  return gulp.src('source/img/sprite.svg')
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

const clean = () => {
  return del('build');
}

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

export const build = gulp.series(
  clean,
  copyFonts,
  optimizeImages,
  svg,
  gulp.parallel(
    createWebp,
    copyIco,
    copyWebmanifest,
    styles,
    html,
    scripts,
    copySprite,
  ),
  gulp.series(
    server,
    watcher
  )
)

export default gulp.series(
  clean,
  copyFonts,
  copyImages,
  svg,
  gulp.parallel(
    createWebp,
    copyIco,
    copyWebmanifest,
    styles,
    html,
    scripts,
    copySprite,
  ),
  gulp.series(
    server,
    watcher
  )
)
