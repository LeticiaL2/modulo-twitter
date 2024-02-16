import Button from '../atoms/Button/Button';
import Text from '../atoms/Text';

const TweetAction = ({ className, actionCount, IconComponent, onClick }) => (
  <div className={className}>
    <Button onClick={onClick}>
      <IconComponent />
    </Button>
    <Text>{actionCount}</Text>
  </div>
);

export default TweetAction;
