import BackArrowIcon from '../../atoms/SVGIcons/BackArrowIcon/BackArrowIcon';
import styles from './style.module.scss';

const BackArrowHeader = ({ title }) => (
  <div className={styles['back-arrow-header--header']}>
    <div className={styles['back-arrow-header--back-arrow-container']}>
      <a className={styles['back-arrow-header--back-anchor']} href="/feed">
        <BackArrowIcon className={styles['back-arrow-header--back-arrow']} />
      </a>
    </div>
    <div className={styles['back-arrow-header--header-title']}>{title}</div>
  </div>
);

export default BackArrowHeader;
