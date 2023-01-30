const fs = require("fs");
const path = require("path");
const NODE_INDEX = Number(process.env.CI_NODE_INDEX || 1);
const NODE_TOTAL = Number(process.env.CI_NODE_TOTAL || 1);

function getspecFiles(TEST_FOLDER) {
  console.log("Creating Sec file for running in parallel");
  const allSpecFiles = walk(TEST_FOLDER);
  const filterspec = allSpecFiles
    .sort()
    .filter((_, index) => index % NODE_TOTAL === NODE_INDEX - 1);
  let specfiles = new Array();
  filterspec.forEach(function (item, index) {
    specfiles.push(
      "import " +
        "'" +
        item.toString().replace(".js", "").replace("cypress/e2e", "..") +
        "'"
    );
  });

  if (!fs.existsSync(TEST_FOLDER + "/" + "tmp/")) {
    fs.mkdirSync(TEST_FOLDER + "/" + "tmp");
  }
  fs.writeFileSync(
    TEST_FOLDER + "/" + "tmp/" + "parallel.cy.js",
    specfiles.toString().replace(/,/g, ";"),
    "utf-8"
  );
  console.log("Created File Successfully");
}
function walk(dir) {
  let files = fs.readdirSync(dir);
  files = files.map((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) return walk(filePath);
    else if (stats.isFile()) return filePath;
  });

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

module.exports = getspecFiles;
