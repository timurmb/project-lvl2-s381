import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import selectParser from './parsers';

const normalize = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

function gendiff(path1, path2, format = 'json') {
  const path1Normalized = normalize(path1);
  const path2Normalized = normalize(path2);

  const str1 = fs.readFileSync(path1Normalized, 'utf8');
  const str2 = fs.readFileSync(path2Normalized, 'utf8');
  const parser = selectParser(format);
  const obj1 = parser(str1);
  const obj2 = parser(str2);

  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  const arr = keys.map((key) => {
    if (!lodash.has(obj2, key)) return ` -${key}:${obj1[key]}`;
    if (!lodash.has(obj1, key)) return ` +${key}:${obj2[key]}`;
    if (lodash.has(obj1, key) && obj1[key] === obj2[key]) return `  ${key}:${obj2[key]}`;
    if (lodash.has(obj1, key) && obj1[key] !== obj2[key]) return [` +${key}:${obj2[key]}`, ` -${key}:${obj1[key]}`];
    return 'strange key';
  });
  const result = `{\n${lodash.flatten(arr).join('\n')}\n}`;
  return result;
}

export default gendiff;
