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
