import { IDept } from '@/app/_model/dept';

export const sortTree = (tree: IDept[]) => {
  const childs = (id: any): any =>
    tree
      .filter((item) => item.parent_id === id)
      .map(({ id, name }) => ({ id, name, children: childs(id) }))
      .map(({ id, name, children }) =>
        children.length ? { id, name, children } : { id, name }
      );
  return childs(0);
};
