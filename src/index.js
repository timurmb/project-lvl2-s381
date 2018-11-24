import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import selectParser from './parsers';

const normalize = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

const buildAST = (obj1, obj2) => {
  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    if (!lodash.has(obj2, key)) return { key, value: obj1[key], action: 'deleted' };
    if (!lodash.has(obj1, key)) return { key, value: obj2[key], action: 'added' };
    if (lodash.has(obj1, key) && obj1[key] === obj2[key]) return { key, value: obj2[key], action: 'same' };
    if (lodash.has(obj1, key) && obj1[key] !== obj2[key]) {
      return [{ key, value: obj2[key], action: 'added' }, { key, value: obj1[key], action: 'deleted' }];
    }
    return 'strange key';
  });
};

const actions = {
  deleted: '-',
  added: '+',
  same: ' ',
};

const render = (AST) => {
  const arr = lodash.flatten(AST).map(obj => ` ${actions[obj.action]}${obj.key}:${obj.value}`);
  return `{\n${arr.join('\n')}\n}`;
};

function gendiff(path1, path2, format = 'json') {
  const path1Normalized = normalize(path1);
  const path2Normalized = normalize(path2);

  const str1 = fs.readFileSync(path1Normalized, 'utf8');
  const str2 = fs.readFileSync(path2Normalized, 'utf8');
  const parse = selectParser(format);
  const obj1 = parse(str1);
  const obj2 = parse(str2);

  const result = render(buildAST(obj1, obj2));
  return result;
}

export default gendiff;
