const stringify = (value) => {
  if (typeof value !== 'object') return value;
  return '[complex value]';
};

function renderPlain(AST, grandParents = [], parent = '') {
  const arr = AST.map((obj) => {
    const parents = (parent !== '') ? [...grandParents, parent] : grandParents;
    const path = [...parents, obj.key].join('.');

    switch (obj.type) {
      case 'nested':
        return renderPlain(obj.children, parents, obj.key);
      case 'updated':
        return `${path} was updated. From ${stringify(obj.valueOld)} to ${stringify(obj.valueNew)}`;
      case 'deleted':
        return `${path} was removed`;
      case 'added':
        return `${path} was added with value: ${stringify(obj.valueNew)}`;
      case 'same':
        return `${path} same value: ${stringify(obj.valueOld)}`;
      default:
        throw new Error('unknown object type in AST');
    }
  });
  return `${arr.join('\n')}`;
}

export default renderPlain;
