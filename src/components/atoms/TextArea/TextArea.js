import styles from './style.module.scss';

const Textarea = ({ variant, children, ...props }) => (
  <textarea className={`${styles[variant]}`} {...props}>
    {children}
  </textarea>
);

export default Textarea;
