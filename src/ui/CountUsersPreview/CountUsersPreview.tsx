import styles from './CountUsersPreview.module.scss';
import cn from 'classnames';
import { CountUsersPreviewProps } from './CountUsersPreview.props';
import uniqid from 'uniqid';
import ImageDefault from '../ImageDefault/ImageDefault';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const CountUsersPreview = ({
  users,
  appearanceBtn,
  listUserVisible,
  children,
  totalUsers,
  className,
  ...props
}: CountUsersPreviewProps): JSX.Element => {
  return (
    <div className={className} {...props}>
      {users && (
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
              {users.map((item, index) => {
                if (index < 3) {
                  return (
                    <div key={uniqid()} className={styles.singleImg}>
                      <ImageDefault
                        src={item.mainImg}
                        width={40}
                        height={40}
                        alt={item.firstname}
                        // objectFit='cover'
                        className='rounded-full mr-4'
                        // priority={true}
                      />
                    </div>
                  );
                }
              })}
            </div>
            {totalUsers && users.length > 3 ? (
              <ButtonIcon appearance={appearanceBtn}>
                +{users.length > 3 ? totalUsers - 3 : users.length}
              </ButtonIcon>
            ) : (
              users.length > 3 && (
                <ButtonIcon appearance={appearanceBtn}>
                  +{users.length - 3}
                </ButtonIcon>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CountUsersPreview;
