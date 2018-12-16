import lodash from 'lodash';
// import buildAST from '../AST';

// const stringify = (value, render, level) => {
//   if (typeof value !== 'object') return value;
//   return render(buildAST(value, value), level + 1);
// };

const stringify = (value, level) => {
  if (typeof value !== 'object') return value;
  const spaces = ' '.repeat(level * 2);
  const arr = Object.keys(value).map(key => `  ${spaces}${key}: ${stringify(value[key], level + 1)}`);
  return `{\n${arr.join('\n')}\n${spaces}}`;
};

function renderStandart(AST, level = 0) {
  const spaces = ' '.repeat(level * 2);

  const arr = AST.map((obj) => {
    switch (obj.type) {
      case 'nested':
        return ` ${spaces} ${obj.key}: ${renderStandart(obj.children, level + 1)}`;
      case 'updated':
        return [
          ` ${spaces}+${obj.key}: ${stringify(obj.valueNew, level + 1)}`,
          ` ${spaces}-${obj.key}: ${stringify(obj.valueOld, level + 1)}`,
        ];
      case 'deleted':
        return ` ${spaces}-${obj.key}: ${stringify(obj.valueOld, level + 1)}`;
      case 'added':
        return ` ${spaces}+${obj.key}: ${stringify(obj.valueNew, level + 1)}`;
      case 'same':
        return ` ${spaces} ${obj.key}: ${stringify(obj.valueOld, level + 1)}`;
      default:
        throw new Error('unknown object type in AST');
    }
  });
  return `{\n${lodash.flatten(arr).join('\n')}\n${spaces}}`;
}

export default renderStandart;
