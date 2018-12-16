const stringify = (value) => {
  if (typeof value !== 'object') return value;
  return '[complex value]';
};

function renderPlain(ast, grandParents = [], parent = '') {
  const arr = ast.map((obj) => {
    const parents = (parent !== '') ? [...grandParents, parent] : grandParents;
    const path = [...parents, obj.key].join('.');

    switch (obj.type) {
      case 'nested':
        return renderPlain(obj.children, parents, obj.key);
      case 'updated':
        return `${path} was updated. From ${stringify(obj.oldValue)} to ${stringify(obj.newValue)}`;
      case 'deleted':
        return `${path} was removed`;
      case 'added':
        return `${path} was added with value: ${stringify(obj.newValue)}`;
      case 'same':
        return `${path} same value: ${stringify(obj.oldValue)}`;
      default:
        throw new Error(`unknown object type in ast - ${obj.type}`);
    }
  });
  return `${arr.join('\n')}`;
}

export default renderPlain;
