import UserHandle from '../UserHandle/UserHandle';
import Image from '../../atoms/Image/Image';
import styles from './style.module.scss';
import TweetAction from '../TweetAction/TweetAction';
import MoreIcon from '../../atoms/SVGIcons/MoreIcon/MoreIcon';

const TweetHeader = ({ user, handleMore }) => (
  <div className={styles['main-card--header']}>
    <div className={styles['main-card--header--user']}>
      <Image src="/user.png" variant="main-card-user-image" />
      <UserHandle user={user} />
      <TweetAction
        className={styles['main-card--more']}
        variant="comment-card--more"
        IconComponent={MoreIcon}
        onClick={handleMore}
      />
    </div>
  </div>
);

export default TweetHeader;
