import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join } from 'path';

import { BOOTSTRAP_FACTORY_PROD_MODULE, TMP_DIR, TOOLS_DIR } from '../../config';
import { makeTsProject, templateLocals } from '../../utils';

const plugins = <any>gulpLoadPlugins();

const INLINE_OPTIONS = {
  base: TMP_DIR,
  useRelativePaths: true,
  removeLineBreaks: true
};

/**
 * Executes the build process, transpiling the TypeScript files for the production environment.
 */

export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/index.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(TMP_DIR, '**/*.ts'),
    '!' + join(TMP_DIR, `**/${BOOTSTRAP_FACTORY_PROD_MODULE}.ts`)
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
    .pipe(plugins.typescript(tsProject))
    .once('error', (e: any) => {
      this.once('finish', () => process.exit(1));
    });


  return result.js
    .pipe(plugins.template(templateLocals()))
    .pipe(gulp.dest(TMP_DIR))
    .on('error', (e: any) => {
      console.log(e);
    });
};
