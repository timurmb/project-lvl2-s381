import gendiff from '../src';

test('step2_test1', () => {
  const path1 = '/home/timur/project2/project-lvl2-s369/__tests__/__fixtures__/test1before.json';
  const path2 = '/home/timur/project2/project-lvl2-s369/__tests__/__fixtures__/test1after.json';
  const result = 'key1:before1 key2:before2 +key3:after3 +key4:after4';
  expect(gendiff(path1, path2)).toBe(result);
});

test('step2_test2', () => {
  const path1 = '/home/timur/project2/project-lvl2-s369/__tests__/__fixtures__/test2before.json';
  const path2 = '/home/timur/project2/project-lvl2-s369/__tests__/__fixtures__/test2after.json';
  const result = 'key1:before1 +key2:after2 -key2:2 +key3:3 -key3:before3 +key5:5 -key4:4';
  expect(gendiff(path1, path2)).toBe(result);
});
