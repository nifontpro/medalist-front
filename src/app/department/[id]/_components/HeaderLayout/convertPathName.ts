export const convertPathName = (pathName: string) => {
  const arr = pathName.split('/');
  const link = arr[arr.length - 1];
  if (link == 'users' || link == 'awards' || link == 'statistics') {
    return link;
  } else return '';
};
