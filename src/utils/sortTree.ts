import { Dept } from '@/types/dept/dept';

export const sortTree = (tree: Dept[], child: number) => {
  if (tree) {
    const childs = (id: any): any =>
      tree
        .filter((item) => item.parentId === id)
        .map(({ id, name }) => ({ id, name, children: childs(id) }))
        .map(({ id, name, children }) =>
          children.length ? { id, name, children } : { id, name }
        );
    return childs(child);
  } else return undefined;
};
