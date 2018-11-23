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
  const format = 'json';
  const result = fs.readFileSync('__tests__/__fixtures__/test2result', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});

test('step3_test1', () => {
  const path1 = '__tests__/__fixtures__/test1before.yml';
  const path2 = '__tests__/__fixtures__/test1after.yml';
  const format = 'yml';
  const result = fs.readFileSync('__tests__/__fixtures__/test1result', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});

test('step3_test2', () => {
  const path1 = '__tests__/__fixtures__/test2before.yml';
  const path2 = '__tests__/__fixtures__/test2after.yml';
  const format = 'yml';
  const result = fs.readFileSync('__tests__/__fixtures__/test2result', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});

test('step4_test1', () => {
  const path1 = '__tests__/__fixtures__/test1before.ini';
  const path2 = '__tests__/__fixtures__/test1after.ini';
  const format = 'ini';
  const result = fs.readFileSync('__tests__/__fixtures__/test1result', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});

test('step4_test2', () => {
  const path1 = '__tests__/__fixtures__/test2before.ini';
  const path2 = '__tests__/__fixtures__/test2after.ini';
  const format = 'ini';
  const result = fs.readFileSync('__tests__/__fixtures__/test2result', 'utf8');
  expect(gendiff(path1, path2, format)).toBe(result);
});
