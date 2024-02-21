import Button from '../../atoms/Button/Button';
import styles from './style.module.scss';

const TweetAction = ({
  className,
  actionCount,
  IconComponent,
  onClick,
  variant,
}) => (
  <div className={`${styles[variant]}`}>
    <Button variant={variant} onClick={onClick}>
      <IconComponent className={className} />
    </Button>
    <span>{actionCount}</span>
  </div>
);

export default TweetAction;
