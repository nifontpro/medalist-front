export const getLastUrl = (pathName: string) => {
  const arr = pathName.split('/');
  const link = arr[arr.length - 1];
  if (link == 'edit') {
    return link;
  } else return '';
};
