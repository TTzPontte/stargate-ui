const storySort = (groups) => (a, b) => {
  const [, { kind: aKind }] = a;
  const [, { kind: bKind }] = b;

  const aGroup = aKind.substr(0, aKind.indexOf('/'));
  const bGroup = bKind.substr(0, bKind.indexOf('/'));

  if (aGroup !== bGroup) {
    const aPos = groups.findIndex((i) => i === aGroup);
    const bPos = groups.findIndex((i) => i === bGroup);

    return aPos - bPos;
  }

  return 0;
};

export default storySort;
