import React, {useState} from "react";
import {ContainerInput} from "./styles"
import {InputStyle} from "./styles"
import {EyeIcon} from "./styles"
import {InvisibleEyeIcon} from "./styles"


function FieldInput({type, ...props}) {
    
    const [showPassword, setShowPassword] = useState(false)
    
    const passwordVisibility = () => {
      if (type === "password") {
        console.log("Clicou no ícone do olho");
        setShowPassword(!showPassword);
        
      }
    };

  
   
    return(
        <ContainerInput>
            
            <InputStyle
            type={showPassword && type ==="password" ? "text" : type}
            {...props}
            />

            {type === "password" ? (
              showPassword ? (
                <InvisibleEyeIcon
                  className="icon_eye"
                  onClick={passwordVisibility}
                />
                ) : (
                <EyeIcon
                  className="icon_eye"
                  onClick={passwordVisibility}
                />
                )
            ) : null}
        </ContainerInput>
  );
}

export default FieldInput