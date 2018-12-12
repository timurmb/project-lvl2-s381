import fs from 'fs';
import gendiff from '../src';

test('step2_test1', () => {
  const path1 = '__tests__/__fixtures__/test1before.json';
  const path2 = '__tests__/__fixtures__/test1after.json';
  const result = fs.readFileSync('__tests__/__fixtures__/test1result', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step2_test2', () => {
  const path1 = '__tests__/__fixtures__/test2before.json';
  const path2 = '__tests__/__fixtures__/test2after.json';
  const result = fs.readFileSync('__tests__/__fixtures__/test2result', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step3_test1', () => {
  const path1 = '__tests__/__fixtures__/test1before.yml';
  const path2 = '__tests__/__fixtures__/test1after.yml';
  const result = fs.readFileSync('__tests__/__fixtures__/test1result', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step3_test2', () => {
  const path1 = '__tests__/__fixtures__/test2before.yml';
  const path2 = '__tests__/__fixtures__/test2after.yml';
  const result = fs.readFileSync('__tests__/__fixtures__/test2result', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step4_test1', () => {
  const path1 = '__tests__/__fixtures__/test1before.ini';
  const path2 = '__tests__/__fixtures__/test1after.ini';
  const result = fs.readFileSync('__tests__/__fixtures__/test1result', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step4_test2', () => {
  const path1 = '__tests__/__fixtures__/test2before.ini';
  const path2 = '__tests__/__fixtures__/test2after.ini';
  const result = fs.readFileSync('__tests__/__fixtures__/test2result', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step5_test3_Nested_json', () => {
  const path1 = '__tests__/__fixtures__/test3before_Nested.json';
  const path2 = '__tests__/__fixtures__/test3after_Nested.json';
  const result = fs.readFileSync('__tests__/__fixtures__/test3result_Nested', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step5_test3_Nested_yml', () => {
  const path1 = '__tests__/__fixtures__/test3before_Nested.yml';
  const path2 = '__tests__/__fixtures__/test3after_Nested.yml';
  const result = fs.readFileSync('__tests__/__fixtures__/test3result_Nested', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step5_test3_Nested_ini', () => {
  const path1 = '__tests__/__fixtures__/test3before_Nested.ini';
  const path2 = '__tests__/__fixtures__/test3after_Nested.ini';
  const result = fs.readFileSync('__tests__/__fixtures__/test3result_Nested', 'utf8');
  expect(gendiff(path1, path2)).toBe(result);
});

test('step6_test3_Nested_Plain_json', () => {
  const path1 = '__tests__/__fixtures__/test3before_Nested.json';
  const path2 = '__tests__/__fixtures__/test3after_Nested.json';
  const format = 'plain';
  const result = fs.readFileSync('__tests__/__fixtures__/test3result_Nested_Plain', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});

test('step6_test3_Nested_Plain_yml', () => {
  const path1 = '__tests__/__fixtures__/test3before_Nested.yml';
  const path2 = '__tests__/__fixtures__/test3after_Nested.yml';
  const format = 'plain';
  const result = fs.readFileSync('__tests__/__fixtures__/test3result_Nested_Plain', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});

test('step6_test3_Nested_Plain_ini', () => {
  const path1 = '__tests__/__fixtures__/test3before_Nested.ini';
  const path2 = '__tests__/__fixtures__/test3after_Nested.ini';
  const format = 'plain';
  const result = fs.readFileSync('__tests__/__fixtures__/test3result_Nested_Plain', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});
