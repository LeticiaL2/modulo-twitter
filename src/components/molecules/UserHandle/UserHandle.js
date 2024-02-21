import styles from './style.module.scss';

const UserHandle = ({ user }) => (
  <div className={styles['main-card--user-info']}>
    <div className={styles['main-card--name']}>{user.nome}</div>
    <div className={styles['main-card--username']}>@{user.usuario}</div>
  </div>
);

export default UserHandle;
