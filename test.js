const { expect } = require('chai');
const { readFileSync } = require('fs');
const { readFileAndParse, cleanObj, writeNewFile } = require('./index.js');
const {
  mockAppSchema,
  cleanMockAppSchema,
} = require('./mocks_for_tests/mock_data.js');

describe('readFileAndParse', () => {
  it('should read and parse JSON file successfully', () => {
    const result = readFileAndParse('./mocks_for_tests/mock_JSON.json');
    expect(result).to.deep.equal(mockAppSchema);
  });
  it('should return an error if file does not exist', () => {
    const result = readFileAndParse('./non_existing_file.json');
    expect(result).to.be.undefined;
  });
});

describe('cleanObj', () => {
  const cleanResult = cleanObj(mockAppSchema);
  it('should remove duplicate fields from objects', () => {
    const uniqueFields = cleanResult.versions[0].objects[0].fields;
    expect(uniqueFields).to.have.lengthOf(2);
    expect(uniqueFields).to.deep.include({ name: 'field1', type: 'string' });
    expect(uniqueFields).to.deep.include({ name: 'field2', type: 'number' });
  });
  it('should remove duplicate views from scenes', () => {
    const uniqueViews = cleanResult.versions[0].scenes[0].views;
    expect(uniqueViews).to.have.lengthOf(2);
    expect(uniqueViews).to.deep.include({ name: 'view1', type: 'form' });
    expect(uniqueViews).to.deep.include({ name: 'view2', type: 'list' });
  });
  it('should return a cleaned object', () => {
    expect(cleanResult).to.deep.equal(cleanMockAppSchema);
  });
});

describe('writeNewFile', () => {
  it('should write a new JSON file from cleaned data', () => {
    const path = './mocks_for_tests/clean_mock_JSON.json';
    writeNewFile(path, cleanMockAppSchema);
    const response = readFileSync(path, 'utf8');
    const fileData = JSON.parse(response);
    expect(fileData).to.deep.equal(cleanMockAppSchema);
  });
});
