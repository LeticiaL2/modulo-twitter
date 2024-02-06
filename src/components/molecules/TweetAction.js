import Button from '../atoms/Button';
import Text from '../atoms/Text';

const TweetAction = ({ className, actionCount, IconComponent }) => (
  <div className={className}>
    <Button className={`${className}-btn`}>
      <IconComponent className={`${className}-svg`} />
    </Button>
    <Text className={`${className}-count`}>{actionCount}</Text>
  </div>
);

export default TweetAction;
