import lodash from 'lodash';
import fs from 'fs';
import gendiff from '../src';

const fileExtensions = ['.json', '.yml', '.ini'];

const testTemplates = [
  ['standart', 'testResult_Standart'],
  ['plain', 'testResult_Plain'],
];
const dir = '__tests__/__fixtures__/';

const testData = testTemplates.map((template) => {
  const [outputFormat, testResultFile] = template;
  return fileExtensions.map(extension => ({
    path1: `${dir}testBefore${extension}`,
    path2: `${dir}testAfter${extension}`,
    format: outputFormat,
    pathResult: `${dir}${testResultFile}`,
  }));
});
const testDataFlat = lodash.flatten(testData);

testDataFlat.forEach((obj) => {
  const testName = `test_${obj.format}`;
  const result = fs.readFileSync(obj.pathResult, 'utf8');
  test(testName, () => {
    expect(gendiff(obj.path1, obj.path2, obj.format)).toBe(result);
  });
});
