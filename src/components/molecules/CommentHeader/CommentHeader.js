import MoreIcon from '../../atoms/SVGIcons/MoreIcon/MoreIcon';
import TweetAction from '../TweetAction/TweetAction';
import styles from './style.module.scss';

function CommentHeader({ name, handle, date, handleMore }) {
  return (
    <div className={styles['comment-card--header']}>
      <div className={styles['comment-card--name']}>{name}</div>
      <div className={styles['comment-card--username']}>@{handle}</div>
      <div className={styles['comment-card--date']}>{date}</div>
      <TweetAction
        className={styles['comment-card--more']}
        variant="comment-card--more"
        IconComponent={MoreIcon}
        onClick={handleMore}
      />
    </div>
  );
}

export default CommentHeader;
