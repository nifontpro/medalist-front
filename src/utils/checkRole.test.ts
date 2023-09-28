import { Gender, RoleUser } from '@/types/user/user';
import { checkRole } from './checkRole';
import { BaseImage, ImageType } from '@/types/base/image/baseImage';

const gender: Gender = 'MALE';
const roles: RoleUser[] = ['USER'];
const type: ImageType = 'USER';
const images: BaseImage[] = [
  {
    id: 1,
    imageUrl: 'imageUrl',
    type,
    main: true,
    createdAt: 123,
  },
];
const user = {
  firstname: 'firstname',
  authEmail: 'authEmail',
  gender,
  awardCount: 10,
  roles,
  images,
};

describe('checkRole', () => {
  beforeAll(() => {});

  test('Вернет false если typeOfUser = undefined и role = USER', () => {
    expect(checkRole(undefined, 'USER')).toBe(false);
  });
  test('Вернет false если typeOfUser = undefined и role = ADMIN', () => {
    expect(checkRole(undefined, 'ADMIN')).toBe(false);
  });
  test('Вернет false если typeOfUser = undefined и role = OWNER', () => {
    expect(checkRole(undefined, 'OWNER')).toBe(false);
  });

  test('Вернет false если roles = [USER] и role = ADMIN', () => {
    user.roles = ['USER'];
    expect(checkRole(user, 'ADMIN')).toBe(false);
  });
  test('Вернет true если roles = [USER, ADMIN] и role = ADMIN', () => {
    user.roles = ['USER', 'ADMIN'];
    expect(checkRole(user, 'ADMIN')).toBe(true);
  });
  test('Вернет false если roles = [USER, ADMIN] и role = OWNER', () => {
    user.roles = ['USER', 'ADMIN'];
    expect(checkRole(user, 'OWNER')).toBe(false);
  });
});
