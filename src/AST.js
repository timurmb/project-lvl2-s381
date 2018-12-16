import lodash from 'lodash';

const nodes = [
  {
    check: ({ key, obj2 }) => !lodash.has(obj2, key),
    createNode: ({ key, value1 }) => ({
      key,
      oldValue: value1,
      type: 'deleted',
    }),
  },
  {
    check: ({ key, obj1 }) => !lodash.has(obj1, key),
    createNode: ({ key, value2 }) => ({
      key,
      newValue: value2,
      type: 'added',
    }),
  },
  {
    check: ({ value1, value2 }) => (typeof value1 === 'object' && typeof value2 === 'object'),
    createNode: ({
      key,
      value1,
      value2,
      buildAST,
    }) => ({
      key,
      newValue: value2,
      oldValue: value1,
      type: 'nested',
      children: buildAST(value1, value2, key),
    }),
  },
  {
    check: ({ value1, value2 }) => value1 === value2,
    createNode: ({ key, value1 }) => ({
      key,
      newValue: value1,
      oldValue: value1,
      type: 'same',
    }),
  },
  {
    check: ({ value1, value2 }) => value1 !== value2,
    createNode: ({
      key,
      value1,
      value2,
    }) => ({
      key,
      newValue: value2,
      oldValue: value1,
      type: 'updated',
    }),
  },
];

const getNode = args => nodes.find(({ check }) => check(args));

const buildAST = (obj1, obj2) => {
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
      buildAST,
    };

    const { createNode } = getNode(args);
    return createNode(args);
  });
};

export default buildAST;
