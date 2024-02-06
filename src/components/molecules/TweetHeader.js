import UserHandle from './UserHandle';
import Image from '../atoms/Image';

const TweetHeader = ({ user }) => (
  <div className="main-card--header">
    <div className="main-card--header--user">
      <Image src="/user.png" className="main-card--user-image" />
      <UserHandle user={user} />
    </div>
  </div>
);

export default TweetHeader;
