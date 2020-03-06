export default function mergeMenuItems(base, extra = []) {
  if (extra.length === 0) {
    return base;
  }
  const menu = base.map(section => Array.from(section));
  for (const item of extra) {
    menu[item.section].splice(item.index, 0, {
      text: item.text,
      handler: item.handler ?
        item.handler :
        (tree, node) => tree.trigger(item.method, [ tree, node ]),
      isActive: item.isActive,
    });
  }
  return menu;
}
