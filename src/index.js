import fs from 'fs';
import lodash from 'lodash';

function gendiff(path1, path2) {
  const str1 = fs.readFileSync(path1, 'utf8');
  const str2 = fs.readFileSync(path2, 'utf8');
  const obj1 = JSON.parse(str1);
  const obj2 = JSON.parse(str2);

  const arr1 = Object.keys(obj1).reduce((acc, key) => {
    if (!lodash.has(obj2, key)) acc = [...acc, `-${key}:${obj1[key]}`];
    return acc;
  }, []);

  const arr2 = Object.keys(obj2).reduce((acc, key) => {
    if (lodash.has(obj1, key) && obj1[key] === obj2[key]) acc = [...acc, `${key}:${obj2[key]}`];
    if (lodash.has(obj1, key) && obj1[key] !== obj2[key]) acc = [...acc, `+${key}:${obj2[key]}`, `-${key}:${obj1[key]}`];
    if (!lodash.has(obj1, key)) acc = [...acc, `+${key}:${obj2[key]}`];
    return acc;
  }, []);

  const result = [...arr2, ...arr1].join(' ');
  return result;
}

export default gendiff;
