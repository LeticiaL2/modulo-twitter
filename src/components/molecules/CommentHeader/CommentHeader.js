import styles from './style.module.scss';

function CommentHeader({ name, handle, date }) {
  return (
    <div className={styles['comment-card--header']}>
      <div className={styles['comment-card--name']}>{name}</div>
      <div className={styles['comment-card--username']}>@{handle}</div>
      <div className={styles['comment-card--date']}>{date}</div>
    </div>
  );
}

export default CommentHeader;
