const gulp = require("gulp");
const $gp = require("gulp-load-plugins")();
const src = "src/svg";
const dest = "public";

function svg() {
  return (
    gulp
      .src(src + "/*.svg")
      // minify svg
      .pipe(
        $gp.svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      // remove all fill, style and stroke declarations in out shapes
      .pipe(
        $gp.cheerio({
          run: function($) {
            $("[fill], [stroke], [style], [width], [height]")
              // .removeAttr("fill")
              // .removeAttr("stroke")
              // .removeAttr("style")
              .removeAttr("width")
              .removeAttr("height");
          },
          parserOptions: { xmlMode: true }
        })
      )
      // cheerio plugin create unnecessary string '&gt;', so replace it.
      .pipe($gp.replace("&gt;", ">"))
      // build svg sprite
      .pipe(
        $gp.svgSprite({
          mode: {
            stack: {
              sprite: "../sprite.svg" //sprite file name
            }
          }
        })
      )
      .pipe(gulp.dest(dest))
  );
}

exports.svg = svg;

gulp.task("default", gulp.series(svg));
