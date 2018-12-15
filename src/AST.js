import lodash from 'lodash';

const nodes = [
  {
    check: ({ key, obj2 }) => !lodash.has(obj2, key),
    createNode: ({ key, value1, parent }) => ({
      key,
      value: value1,
      type: 'deleted',
      parent,
      children: [],
    }),
  },
  {
    check: ({ key, obj1 }) => !lodash.has(obj1, key),
    createNode: ({ key, value2, parent }) => ({
      key,
      value: value2,
      type: 'added',
      parent,
      children: [],
    }),
  },
  {
    check: ({ value1, value2 }) => (typeof value1 === 'object' && typeof value2 === 'object'),
    createNode: ({
      key,
      value1,
      value2,
      parent,
      buildAST,
    }) => ({
      key,
      valueNew: value2,
      valueOld: value1,
      type: 'nested',
      parent,
      children: buildAST(value1, value2, key),
    }),
  },
  {
    check: ({ value1, value2 }) => value1 === value2,
    createNode: ({ key, value1, parent }) => ({
      key,
      value: value1,
      type: 'same',
      parent,
      children: [],
    }),
  },
  {
    check: ({ value1, value2 }) => value1 !== value2,
    createNode: ({
      key,
      value1,
      value2,
      parent,
    }) => ({
      key,
      valueNew: value2,
      valueOld: value1,
      type: 'updated',
      parent,
      children: [],
    }),
  },
];

const getNode = args => nodes.find(({ check }) => check(args));

const buildAST = (obj1, obj2, parent = '') => {
  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const args = {
      key,
      obj1,
      obj2,
      value1,
      value2,
      parent,
      buildAST,
    };

    const { createNode } = getNode(args);
    return createNode(args);
  });
};

export default buildAST;
