import gendiff from '../src';

test('step2_test1', () => {
  const path1 = '__tests__/__fixtures__/test1before.json';
  const path2 = '__tests__/__fixtures__/test1after.json';
  const result = '{\n  key1:before1\n  key2:before2\n +key3:after3\n +key4:after4\n}';
  expect(gendiff(path1, path2)).toBe(result);
});

test('step2_test2', () => {
  const path1 = '__tests__/__fixtures__/test2before.json';
  const path2 = '__tests__/__fixtures__/test2after.json';
  const result = '{\n  key1:before1\n +key2:after2\n -key2:2\n +key3:3\n -key3:before3\n +key5:5\n -key4:4\n}';
  expect(gendiff(path1, path2)).toBe(result);
});
