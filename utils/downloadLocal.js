const downloadGit = require('download-git-repo');

module.exports = async function downloadLocal(templateName, projectName) {
  let api = `github:Jake0105/${templateName}`;
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}