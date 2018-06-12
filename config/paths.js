const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

module.exports = {
    tsConfig: resolveApp('client/tsconfig.json'),
    appBuild: resolveApp('build/client'),
    appHtml: resolveApp('client/index.html'),
    appIndexJs: resolveApp('client/index.tsx'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('client'),
    appNodeModules: resolveApp('node_modules')
};