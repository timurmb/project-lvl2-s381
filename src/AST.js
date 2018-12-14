import lodash from 'lodash';

const getNode = (key, obj1, obj2, value1, value2, parent) => {
  const nodes = [
    {
      key,
      value: value1,
      type: 'deleted',
      parent,
      check: ({ k, o2 }) => !lodash.has(o2, k),
    },
    {
      key,
      value: value2,
      type: 'added',
      parent,
      check: ({ k, o1 }) => !lodash.has(o1, k),
    },
    {
      key,
      type: 'withChildren',
      parent,
      check: ({ v1, v2 }) => (typeof v1 === 'object' && typeof v2 === 'object'),
    },
    {
      key,
      value: value1,
      type: 'same',
      parent,
      check: ({ v1, v2 }) => v1 === v2,
    },
    {
      key,
      valueNew: value2,
      valueOld: value1,
      type: 'updated',
      parent,
      check: ({ v1, v2 }) => v1 !== v2,
    },
  ];

  const args = {
    k: key,
    o1: obj1,
    o2: obj2,
    v1: value1,
    v2: value2,
  };
  return nodes.find(({ check }) => check(args));
};

const buildAST = (obj1, obj2, parent = '') => {
  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const node = getNode(key, obj1, obj2, value1, value2, parent);
    if (node.type === 'withChildren') node.children = buildAST(value1, value2, key);
    return node;
  });
};

export default buildAST;
