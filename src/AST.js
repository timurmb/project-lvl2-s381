import lodash from 'lodash';

class NodeDeleted {
  constructor(args) {
    this.key = args.key;
    this.value = args.v1;
    this.type = 'deleted';
    this.parent = args.parent;
  }
}

class NodeAdded {
  constructor(args) {
    this.key = args.key;
    this.value = args.v2;
    this.type = 'added';
    this.parent = args.parent;
  }
}

class NodeSame {
  constructor(args) {
    this.key = args.key;
    this.value = args.v2;
    this.type = 'same';
    this.parent = args.parent;
  }
}

class NodeUpdated {
  constructor(args) {
    this.key = args.key;
    this.valueNew = args.v2;
    this.valueOld = args.v1;
    this.type = 'updated';
    this.parent = args.parent;
  }
}

class NodeWithChildren {
  constructor(args) {
    this.key = args.key;
    this.type = 'withChildren';
    this.parent = args.parent;
    this.children = args.buildASTCopy(args.v1, args.v2, args.key);
  }
}

const buildAST = (obj1, obj2, parent = '') => {
  const keys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const args = {
      key,
      v2: obj2[key],
      v1: obj1[key],
      parent,
      buildASTCopy: buildAST,
    };
    if (!lodash.has(obj2, key)) return new NodeDeleted(args);
    if (!lodash.has(obj1, key)) return new NodeAdded(args);
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return new NodeWithChildren(args);
    }
    if (obj1[key] === obj2[key]) return new NodeSame(args);
    if (obj1[key] !== obj2[key]) return new NodeUpdated(args);
    throw new Error('strange key');
  });
};

export default buildAST;
