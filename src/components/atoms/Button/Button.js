import styles from './style.module.scss';

const Button = ({ children, variant, ...props }) => (
  <button className={`${styles[variant]}`} {...props}>
    {children}
  </button>
);

export default Button;
