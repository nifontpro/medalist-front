import styles from './CountUsersPreview.module.scss';
import cn from 'classnames';
import { CountUsersPreviewProps } from './CountUsersPreview.props';
import uniqid from 'uniqid';
import { declOfNum } from '@/utils/declOfNum';
import P from '../P/P';
import ImageDefault from '../ImageDefault/ImageDefault';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const CountUsersPreview = ({
  usersAwards,
  appearanceBtn,
  usersInDepartment,
  listUserVisible,
  children,
  className,
  ...props
}: CountUsersPreviewProps): JSX.Element => {
  return (
    <div className={className} {...props}>
      {usersInDepartment && (
        <div
          className={cn(className, {
            [styles.container]: !listUserVisible,
            [styles.hidden]: listUserVisible,
          })}
        >
          <P size='xs' color='gray'>
            {usersInDepartment.length}{' '}
            {declOfNum(usersInDepartment.length, [
              'сотрудник',
              'сотрудника',
              'сотрудников',
            ])}
          </P>
          <div className={styles.imgWrapper}>
            <div className={styles.img}>
              {usersInDepartment.map((user, index) => {
                if (index < 3) {
                  return (
                    <div key={uniqid()} className={styles.singleImg}>
                      <ImageDefault
                        src={user.mainImg}
                        width={40}
                        height={40}
                        alt={user.firstname}
                        objectFit='cover'
                        className='rounded-full mr-4'
                        // priority={true}
                      />
                    </div>
                  );
                }
              })}
            </div>
            {usersInDepartment.length > 3 && (
              <ButtonIcon appearance={appearanceBtn}>
                +{usersInDepartment.length - 3}
              </ButtonIcon>
            )}
          </div>
        </div>
      )}
      {usersAwards && (
        <div
          className={cn(className, {
            [styles.container]: !listUserVisible,
            [styles.hidden]: listUserVisible,
          })}
        >
          {/* <P size='xs' color='gray'>
            {usersAwards.length}{' '}
            {declOfNum(usersAwards.length, [
              'сотрудник',
              'сотрудника',
              'сотрудников',
            ])}
          </P> */}
          <div className={styles.imgWrapper}>
            <div className={styles.imgAwards}>
              {usersAwards.map((item, index) => {
                if (index < 3) {
                  return (
                    <div key={uniqid()} className={styles.singleImg}>
                      <ImageDefault
                        src={item.mainImg}
                        width={40}
                        height={40}
                        alt={item.firstname}
                        objectFit='cover'
                        className='rounded-full mr-4'
                        // priority={true}
                      />
                    </div>
                  );
                }
              })}
            </div>
            {usersAwards.length > 3 && (
              <ButtonIcon appearance={appearanceBtn}>
                +{usersAwards.length - 3}
              </ButtonIcon>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CountUsersPreview;
