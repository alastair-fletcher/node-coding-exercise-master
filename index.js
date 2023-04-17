const { readFileSync, writeFileSync } = require('fs');
const _ = require('lodash');

//====== read JSON file and parse as JS object
function readFileAndParse(path) {
  try {
    const response = readFileSync(path, 'utf8');
    const data = JSON.parse(response);
    return data;
  } catch (error) {
    console.log(error);
  }
}
const appSchema = readFileAndParse('./mock_application.json');

//====== remove duplicates and return 'cleaned' object
function cleanObj(obj) {
  const [version] = obj.versions;

  const removeDupes = (parent, child) => {
    return version[parent].map((el) => {
      const uniques = _.uniqWith(el[child], _.isEqual);
      const cleaned = {
        ...el,
        [child]: uniques,
      };
      return cleaned;
    });
  };

  const objectsWithUniqueFields = removeDupes('objects', 'fields');
  const scenesWithUniqueViews = removeDupes('scenes', 'views');

  const cleanedObj = {
    ...obj,
    versions: [
      {
        ...obj.versions[0],
        objects: objectsWithUniqueFields,
        scenes: scenesWithUniqueViews,
      },
    ],
  };

  return cleanedObj;
}
const cleanedAppSchema = cleanObj(appSchema);

//====== stringify and write new JSON file
function writeNewFile(path, data) {
  try {
    const stringifiedData = JSON.stringify(data);
    writeFileSync(path, stringifiedData);
  } catch (error) {
    console.log(error);
  }
}
writeNewFile('clean_application.json', cleanedAppSchema);

module.exports = {
  readFileAndParse,
  cleanObj,
  writeNewFile,
};
