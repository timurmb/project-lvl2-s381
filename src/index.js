import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import selectParser from './parsers';

const actions = { deleted: '-', added: '+', same: ' ' };

const normalize = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
};

const buildAST = (obj1, obj2, level = 0) => {
  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    if (!lodash.has(obj2, key)) return { key, value: obj1[key], action: 'deleted', level };
    if (!lodash.has(obj1, key)) return { key, value: obj2[key], action: 'added', level };

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { key, children: buildAST(obj1[key], obj2[key], level + 1), level };
    }

    if (obj1[key] === obj2[key]) return { key, value: obj2[key], action: 'same', level };
    if (obj1[key] !== obj2[key]) {
      return [
        { key, value: obj2[key], action: 'added', level },
        { key, value: obj1[key], action: 'deleted', level },
      ];
    }
    return 'strange key';
  });
};

const stringify = (v, level, renderCopy) => {
  if (typeof v !== 'object') return v;
  return renderCopy(buildAST(v, v, level + 1));
};

const renderers = {
  standart: function renderStandart(AST) {
    let spaces;
    const arr = lodash.flatten(AST).map((obj) => {
      spaces = ' '.repeat(obj.level * 2);
      if (!obj.children) return ` ${spaces}${actions[obj.action]}${obj.key}: ${stringify(obj.value, obj.level, renderStandart)}`;
      return `  ${spaces}${obj.key}: ${renderStandart(obj.children)}`;
    });
    return `{\n${arr.join('\n')}\n${spaces}}`;
  },
  plain: 'plain',
};

const selectRenderer = (format) => {
  if (!renderers[format]) throw new Error('unknown rendering format');
  return renderers[format];
};

function gendiff(path1, path2, inputFormat = 'json', outputFormat = 'standart') {
  const path1Normalized = normalize(path1);
  const path2Normalized = normalize(path2);

  const str1 = fs.readFileSync(path1Normalized, 'utf8');
  const str2 = fs.readFileSync(path2Normalized, 'utf8');
  const parse = selectParser(inputFormat);
  const obj1 = parse(str1);
  const obj2 = parse(str2);

  const render = selectRenderer(outputFormat);
  const result = render(buildAST(obj1, obj2));
  return result;
}

export default gendiff;
