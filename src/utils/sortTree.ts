import { Dept } from '@/types/dept/dept';

export const sortTree = (tree: Dept[], child: number) => {
  if (tree) {
    const childs = (id: any): any =>
      tree
        .filter((item) => item.parentId === id)
        .map(({ id, name, mainImg }) => ({
          id,
          name,
          mainImg,
          children: childs(id),
        }))
        .map(({ id, name, mainImg, children }) =>
          children.length
            ? { id, name, mainImg, children }
            : { id, name, mainImg }
        );
    return childs(child);
  } else return undefined;
};
