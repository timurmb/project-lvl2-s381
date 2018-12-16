import stringify from '../utils';

function renderPlain(AST, grandParents = [], parent = '') {
  const arr = AST.map((obj) => {
    const parents = (parent !== '') ? [...grandParents, parent] : grandParents;

    switch (obj.type) {
      case 'nested':
        return renderPlain(obj.children, parents, obj.key);
      case 'updated':
        return `${[...parents, obj.key].join('.')} was updated. `
          + `From ${stringify({ value: obj.valueOld, output: 'plain' })} `
          + `to ${stringify({ value: obj.valueNew, output: 'plain' })}`;
      case 'deleted':
        return `${[...parents, obj.key].join('.')} was removed`;
      case 'added':
        return `${[...parents, obj.key].join('.')} was added with value: `
          + `${stringify({ value: obj.valueNew, output: 'plain' })}`;
      case 'same':
        return `${[...parents, obj.key].join('.')} same value: `
          + `${stringify({ value: obj.valueOld, output: 'plain' })}`;
      default:
        throw new Error('unknown object type in AST');
    }
  });
  return `${arr.join('\n')}`;
}

export default renderPlain;
