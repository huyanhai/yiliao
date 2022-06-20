export const getTree = (list, pid, data) => {
  // 获取所有一级
  for (const item of list) {
    if (item.parentId === pid) {
      data.push(item);
    }
  }
  // 获取子级
  for (const i of data) {
    i.children = [];
    getTree(list, i.id, i.children); // 递归调用
    if (i.children.length === 0) {
      delete i.children;
    }
  }

  return data;
};
