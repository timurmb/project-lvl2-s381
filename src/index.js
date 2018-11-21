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

  const arr1 = Object.keys(obj1).reduce((acc, key) => {
    if (!lodash.has(obj2, key)) acc = [...acc, ` -${key}:${obj1[key]}\n`];
    return acc;
  }, []);

  const arr2 = Object.keys(obj2).reduce((acc, key) => {
    if (lodash.has(obj1, key) && obj1[key] === obj2[key]) acc = [...acc, `  ${key}:${obj2[key]}\n`];
    if (lodash.has(obj1, key) && obj1[key] !== obj2[key]) acc = [...acc, ` +${key}:${obj2[key]}\n`, ` -${key}:${obj1[key]}\n`];
    if (!lodash.has(obj1, key)) acc = [...acc, ` +${key}:${obj2[key]}\n`];
    return acc;
  }, []);

  const result = `{\n${[...arr2, ...arr1].join('')}}`;
  return result;
}

export default gendiff;
