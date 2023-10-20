import React, {useContext} from "react";
import UserPhoto from '../../atoms/user-photo/user-photo'; // Importe o componente UserPhoto
import { HeaderContainer, LogoX,ContainerPhoto, ContainerLogo, ContainerLogout } from './styles';
import Button from "../../atoms/button/button"
import { AuthContext } from "../../../contexts/auth";




function HeaderHome() {

    const {logout} = useContext(AuthContext)
    
    const handleLogout = () => {
      logout();
    };


  return (
    <HeaderContainer>
        <ContainerPhoto>
            <UserPhoto/>
        </ContainerPhoto>
        
        <ContainerLogo>
            <LogoX/>
        </ContainerLogo>

        <ContainerLogout>
            <Button
                $border="1px solid white"
                $backgroundColor="black"
                color="#00acee"
                $text="Sair"
                onClick={handleLogout}/>
        </ContainerLogout>

    </HeaderContainer>
  );
};

export default HeaderHome;