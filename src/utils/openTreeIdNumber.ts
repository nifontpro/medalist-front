import { CookieValueTypes } from 'cookies-next';

export const openTreeOnIdNumber = (pathName: string | null) => {
  const numberId = Number(
    pathName?.split('/')[pathName?.split('/').length - 1]
  );

  const stringNumberArray = [];
  if (numberId) {
    for (let i = 1; i <= numberId; i++) {
      stringNumberArray.push(i.toString());
    }
  }

  if (stringNumberArray.length === 0) {
    return ['1'];
  } else {
    return stringNumberArray;
  }
};

export const cookieOnStringArray = (node: CookieValueTypes): string[] => {
  if (node && node != true) {
    node = node.replace(/["\[\]]/g, '');
    return node.split(',');
  } else return ['1'];
};
