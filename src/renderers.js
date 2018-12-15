import lodash from 'lodash';
import buildAST from './AST';

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
      if (obj.type === 'nested') return `  ${spaces}${obj.key}: ${renderStandart(obj.children, level + 1)}`;
      if (obj.type === 'updated') {
        return [
          ` ${spaces}${types.standart.added}${obj.key}: `
              + `${stringify({
                key: obj.key,
                value: obj.valueNew,
                renderCopy: renderStandart,
                level,
              })}`,
          ` ${spaces}${types.standart.deleted}${obj.key}: `
              + `${stringify({
                key: obj.key,
                value: obj.valueOld,
                renderCopy: renderStandart,
                level,
              })}`,
        ];
      }
      if (obj.type === 'deleted' || obj.type === 'added' || obj.type === 'same') {
        return ` ${spaces}${types.standart[obj.type]}${obj.key}: `
            + `${stringify({
              key: obj.key,
              value: obj.value,
              renderCopy: renderStandart,
              level,
            })}`;
      }
      throw new Error('unknown object type in AST');
    });
    return `{\n${lodash.flatten(arr).join('\n')}\n${spaces}}`;
  },

  plain: function renderPlain(AST, grandParents = []) {
    const arr = AST.map((obj) => {
      const parents = (obj.parent !== '') ? [...grandParents, obj.parent] : grandParents;

      if (obj.type === 'nested') return renderPlain(obj.children, parents);
      if (obj.type === 'updated') {
        return `${[...parents, obj.key].join('.')} ${types.plain.updated}. `
            + `From ${stringify({ value: obj.valueOld, output: 'plain' })} `
            + `to ${stringify({ value: obj.valueNew, output: 'plain' })}`;
      }
      if (obj.type === 'deleted') {
        return `${[...parents, obj.key].join('.')} ${types.plain.deleted}`;
      }
      if (obj.type === 'added') {
        return `${[...parents, obj.key].join('.')} ${types.plain.added} with value: `
            + `${stringify({ value: obj.value, output: 'plain' })}`;
      }
      if (obj.type === 'same') {
        return `${[...parents, obj.key].join('.')} ${types.plain.same}: `
            + `${stringify({ value: obj.value, output: 'plain' })}`;
      }
      throw new Error('unknown object type in AST');
    });
    return `${arr.join('\n')}`;
  },

};

export default (format) => {
  if (!renderers[format]) throw new Error('unknown rendering format');
  return renderers[format];
};
