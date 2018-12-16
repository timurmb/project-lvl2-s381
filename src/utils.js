import buildAST from './AST';

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

export default stringify;
