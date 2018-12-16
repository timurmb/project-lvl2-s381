import lodash from 'lodash';
import stringify from '../utils';

function renderStandart(AST, level = 0) {
  const spaces = ' '.repeat(level * 2);

  const arr = AST.map((obj) => {
    switch (obj.type) {
      case 'nested':
        return `  ${spaces}${obj.key}: ${renderStandart(obj.children, level + 1)}`;
      case 'updated':
        return [
          ` ${spaces}+${obj.key}: `
            + `${stringify({
              key: obj.key,
              value: obj.valueNew,
              renderCopy: renderStandart,
              level,
            })}`,
          ` ${spaces}-${obj.key}: `
            + `${stringify({
              key: obj.key,
              value: obj.valueOld,
              renderCopy: renderStandart,
              level,
            })}`,
        ];
      case 'deleted':
        return ` ${spaces}-${obj.key}: `
        + `${stringify({
          key: obj.key,
          value: obj.valueOld,
          renderCopy: renderStandart,
          level,
        })}`;
      case 'added':
        return ` ${spaces}+${obj.key}: `
        + `${stringify({
          key: obj.key,
          value: obj.valueNew,
          renderCopy: renderStandart,
          level,
        })}`;
      case 'same':
        return ` ${spaces} ${obj.key}: `
        + `${stringify({
          key: obj.key,
          value: obj.valueOld,
          renderCopy: renderStandart,
          level,
        })}`;
      default:
        throw new Error('unknown object type in AST');
    }
  });
  return `{\n${lodash.flatten(arr).join('\n')}\n${spaces}}`;
}

export default renderStandart;
