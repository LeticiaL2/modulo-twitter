import styles from './style.module.scss';

const Input = ({ variant, ...props }) => (
  <input className={`${styles[variant]}`} {...props} />
);

export default Input;
