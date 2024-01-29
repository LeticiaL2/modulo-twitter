import Image from '../atoms/Image';
import Button from '../atoms/Button';

function Header({ handleLogout }) {
  return (
    <div className="tweet-feed--header">
      <Image src="x_icon.png" alt="Close" />
      <h4>Feed</h4>
      <Button onClick={handleLogout}> Sair </Button>
    </div>
  );
}

export default Header;
