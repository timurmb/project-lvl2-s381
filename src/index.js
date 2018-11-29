import fs from 'fs';
import lodash from 'lodash';
import path from 'path';
import selectParser from './parsers';

// AST
const buildAST = (obj1, obj2, parent = '') => {
  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    if (!lodash.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        type: 'deleted',
        parent,
      };
    }
    if (!lodash.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        type: 'added',
        parent,
      };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return { key, children: buildAST(obj1[key], obj2[key], key), parent };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key,
        value: obj2[key],
        type: 'same',
        parent,
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        value: { new: obj2[key], old: obj1[key] },
        type: 'updated',
        parent,
      };
    }
    throw new Error('strange key');
  });
};

// render
const types = {
  standart: { deleted: '-', added: '+', same: ' ' },
  plain: {
    deleted: 'was removed',
    added: 'was added',
    same: 'same value',
    updated: 'was updated',
  },
};

const stringify = (obj) => {
  const {
    key,
    value,
    renderCopy,
    level,
    output,
  } = obj;
  if (typeof value !== 'object') return value;
  if (output === 'plain') return '[complex value]';
  return renderCopy(buildAST(value, value, key), level + 1);
};

const renderers = {

  standart: function renderStandart(AST, level = 0) {
    const spaces = ' '.repeat(level * 2);

    const arr = AST.map((obj) => {
      if (!obj.children && obj.type === 'updated') {
        return [
          ` ${spaces}${types.standart.added}${obj.key}: `
            + `${stringify({
              key: obj.key,
              value: obj.value.new,
              renderCopy: renderStandart,
              level,
            })}`,
          ` ${spaces}${types.standart.deleted}${obj.key}: `
            + `${stringify({
              key: obj.key,
              value: obj.value.old,
              renderCopy:
              renderStandart,
              level,
            })}`,
        ];
      }
      if (!obj.children) {
        return ` ${spaces}${types.standart[obj.type]}${obj.key}: `
          + `${stringify({
            key: obj.key,
            value: obj.value,
            renderCopy: renderStandart,
            level,
          })}`;
      }
      return `  ${spaces}${obj.key}: ${renderStandart(obj.children, level + 1)}`;
    });
    return `{\n${lodash.flatten(arr).join('\n')}\n${spaces}}`;
  },

  plain: function renderPlain(AST, grandParents = []) {
    const arr = AST.map((obj) => {
      const parents = (obj.parent !== '') ? [...grandParents, obj.parent] : grandParents;

      if (!obj.children && obj.type === 'updated') {
        return `${[...parents, obj.key].join('.')} ${types.plain.updated}. `
          + `From ${stringify({ value: obj.value.old, output: 'plain' })} `
          + `to ${stringify({ value: obj.value.new, output: 'plain' })}`;
      }
      if (!obj.children && obj.type === 'deleted') {
        return `${[...parents, obj.key].join('.')} ${types.plain.deleted}`;
      }
      if (!obj.children && obj.type === 'added') {
        return `${[...parents, obj.key].join('.')} ${types.plain.added} with value: `
          + `${stringify({ value: obj.value, output: 'plain' })}`;
      }
      if (!obj.children && obj.type === 'same') {
        return `${[...parents, obj.key].join('.')} ${types.plain.same}: `
          + `${stringify({ value: obj.value, output: 'plain' })}`;
      }
      return renderPlain(obj.children, parents);
    });
    return `${arr.join('\n')}`;
  },

};

const selectRenderer = (format) => {
  if (!renderers[format]) throw new Error('unknown rendering format');
  return renderers[format];
};

// gendiff
const normalize = (filepath) => {
  const workingDir = process.cwd();
  return path.resolve(workingDir, filepath);
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
