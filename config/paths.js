'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
  ];
  
  // Resolve file paths in the same order as webpack
  const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
      fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );
  
    if (extension) {
      return resolveFn(`${filePath}.${extension}`);
    }
  
    return resolveFn(`${filePath}.js`);
  };
  
  // config after eject: we're in ./config/
  module.exports = {
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    optionsHtml: resolveApp('src/options/index.html'),
    optionsIndex: resolveApp('src/options/index.tsx'),
    popupHtml: resolveApp('src/popup/index.html'),
    popupIndex: resolveApp('src/popup/index.tsx'),
    backgroundJs: resolveApp('src/background/index.ts'),
    injectJs: resolveApp('src/inject_script.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    appNodeModules: resolveApp('node_modules'),
    appManifest: resolveApp('src/manifest.json')
  };
  
  
  
  module.exports.moduleFileExtensions = moduleFileExtensions;
  