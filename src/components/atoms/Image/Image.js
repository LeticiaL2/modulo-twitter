import styles from './style.module.scss';

const Image = ({ variant, ...props }) => (
  <img className={`${styles[variant]}`} {...props} />
);

export default Image;
