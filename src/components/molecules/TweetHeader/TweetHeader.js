import UserHandle from '../UserHandle/UserHandle';
import Image from '../../atoms/Image/Image';
import styles from './style.module.scss';

const TweetHeader = ({ user }) => (
  <div className={styles['main-card--header']}>
    <div className={styles['main-card--header--user']}>
      <Image src="/user.png" variant="main-card-user-image" />
      <UserHandle user={user} />
    </div>
  </div>
);

export default TweetHeader;
