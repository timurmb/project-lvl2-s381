import fs from 'fs';
import gendiff from '../src';

const testData = [
  {
    testName: 'step2_test1',
    path1: '__tests__/__fixtures__/test1before.json',
    path2: '__tests__/__fixtures__/test1after.json',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test1result',
  },
  {
    testName: 'step2_test2',
    path1: '__tests__/__fixtures__/test2before.json',
    path2: '__tests__/__fixtures__/test2after.json',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test2result',
  },
  {
    testName: 'step3_test1',
    path1: '__tests__/__fixtures__/test1before.yml',
    path2: '__tests__/__fixtures__/test1after.yml',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test1result',
  },
  {
    testName: 'step3_test2',
    path1: '__tests__/__fixtures__/test2before.yml',
    path2: '__tests__/__fixtures__/test2after.yml',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test2result',
  },
  {
    testName: 'step4_test1',
    path1: '__tests__/__fixtures__/test1before.ini',
    path2: '__tests__/__fixtures__/test1after.ini',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test1result',
  },
  {
    testName: 'step4_test2',
    path1: '__tests__/__fixtures__/test2before.ini',
    path2: '__tests__/__fixtures__/test2after.ini',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test2result',
  },
  {
    testName: 'step5_test3_Nested_json',
    path1: '__tests__/__fixtures__/test3before_Nested.json',
    path2: '__tests__/__fixtures__/test3after_Nested.json',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test3result_Nested',
  },
  {
    testName: 'step5_test3_Nested_yml',
    path1: '__tests__/__fixtures__/test3before_Nested.yml',
    path2: '__tests__/__fixtures__/test3after_Nested.yml',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test3result_Nested',
  },
  {
    testName: 'step5_test3_Nested_ini',
    path1: '__tests__/__fixtures__/test3before_Nested.ini',
    path2: '__tests__/__fixtures__/test3after_Nested.ini',
    format: 'standart',
    pathResult: '__tests__/__fixtures__/test3result_Nested',
  },
  {
    testName: 'step6_test3_Nested_Plain_json',
    path1: '__tests__/__fixtures__/test3before_Nested.json',
    path2: '__tests__/__fixtures__/test3after_Nested.json',
    format: 'plain',
    pathResult: '__tests__/__fixtures__/test3result_Nested_Plain',
  },
  {
    testName: 'step6_test3_Nested_Plain_yml',
    path1: '__tests__/__fixtures__/test3before_Nested.yml',
    path2: '__tests__/__fixtures__/test3after_Nested.yml',
    format: 'plain',
    pathResult: '__tests__/__fixtures__/test3result_Nested_Plain',
  },
  {
    testName: 'step6_test3_Nested_Plain_ini',
    path1: '__tests__/__fixtures__/test3before_Nested.ini',
    path2: '__tests__/__fixtures__/test3after_Nested.ini',
    format: 'plain',
    pathResult: '__tests__/__fixtures__/test3result_Nested_Plain',
  },
];

testData.forEach((obj) => {
  const result = fs.readFileSync(obj.pathResult, 'utf8');
  test(obj.testName, () => {
    expect(gendiff(obj.path1, obj.path2, obj.format)).toBe(result);
  });
});
