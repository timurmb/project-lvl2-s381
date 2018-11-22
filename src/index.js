import fs from 'fs';
import lodash from 'lodash';
import path from 'path';

const normalize = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

function gendiff(path1, path2) {
  const path1Normalized = normalize(path1);
  const path2Normalized = normalize(path2);

  const str1 = fs.readFileSync(path1Normalized, 'utf8');
  const str2 = fs.readFileSync(path2Normalized, 'utf8');
  const obj1 = JSON.parse(str1);
  const obj2 = JSON.parse(str2);

  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  const arr = keys.map((key) => {
    if (!lodash.has(obj2, key)) return ` -${key}:${obj1[key]}\n`;
    if (!lodash.has(obj1, key)) return ` +${key}:${obj2[key]}\n`;
    if (lodash.has(obj1, key) && obj1[key] === obj2[key]) return `  ${key}:${obj2[key]}\n`;
    if (lodash.has(obj1, key) && obj1[key] !== obj2[key]) return ` +${key}:${obj2[key]}\n -${key}:${obj1[key]}\n`;
    return 'strange key';
  });
  const result = `{\n${arr.join('')}}`;
  return result;
}

export default gendiff;
