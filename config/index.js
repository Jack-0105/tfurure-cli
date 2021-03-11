const pkg = require('../package.json');

// 当前版本
const VERSION = pkg.version;

const platform = process.platform;

const HOME = process.env[platform === 'win32' ? 'USERPROFILE' : 'HOME'];

const CONFIG_DIR = `${HOME}/.eosrc`;

// 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/{repository}/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
const GITHUB_CONFIG = {
  registry: 'tfuture-template',
  type: 'users'
}

module.exports = {
  VERSION,
  HOME,
  CONFIG_DIR,
  GITHUB_CONFIG
}