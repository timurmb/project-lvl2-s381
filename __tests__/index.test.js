import lodash from 'lodash';
import fs from 'fs';
import gendiff from '../src';

const fileExtensions = ['.json', '.yml', '.ini'];

const testTemplates = [
  ['step2-4', 'flat', 'standart', fileExtensions],
  ['step5', 'nested', 'standart', fileExtensions],
  ['step6', 'nested', 'plain', fileExtensions],
];
const dir = '__tests__/__fixtures__/';
const testInputFiles = {
  flat: { before: 'testBefore_Flat', after: 'testAfter_Flat' },
  nested: { before: 'testBefore_Nested', after: 'testAfter_Nested' },
};
const testResultFiles = {
  flat: { standart: 'testResult_Flat_Standart' },
  nested: { standart: 'testResult_Nested_Standart', plain: 'testResult_Nested_Plain' },
};

const testData = testTemplates.map((template) => {
  const [testName, inputType, outputFormat, exts] = template;
  return exts.map(ext => ({
    testName,
    path1: `${dir}${testInputFiles[inputType].before}${ext}`,
    path2: `${dir}${testInputFiles[inputType].after}${ext}`,
    format: outputFormat,
    pathResult: `${dir}${testResultFiles[inputType][outputFormat]}`,
  }));
});
const testDataFlat = lodash.flatten(testData);

testDataFlat.forEach((obj) => {
  const result = fs.readFileSync(obj.pathResult, 'utf8');
  test(obj.testName, () => {
    expect(gendiff(obj.path1, obj.path2, obj.format)).toBe(result);
  });
});
