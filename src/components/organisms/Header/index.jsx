import React, {useContext} from 'react';
import { HeaderContainer, TwitterLogoContainer } from './styles';
import { AuthContext } from '../../../contexts/auth';
import UserPhoto from '../../atoms/UserPhoto';
import TwitterIcon from '../../atoms/SVGIcons/TwitterIcon';
import Button from '../../atoms/Button';
import { colors } from '../../../styles/colors';
import { BiLogOutCircle } from 'react-icons/bi';

function Header() {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
      <TwitterLogoContainer>
        <TwitterIcon />
      </TwitterLogoContainer>
      <Button className="logout-text" $backgroundColor={colors.black} $fontColor={colors.white} $borderColor={colors.white} onClick={handleLogout}>
        Logout
      </Button>
      <Button className="logout-icon" $backgroundColor={colors.black} $fontColor={colors.white} $borderColor={colors.white} onClick={handleLogout}>
        <BiLogOutCircle />
      </Button>
    </HeaderContainer>
  );
}

export default Header;
