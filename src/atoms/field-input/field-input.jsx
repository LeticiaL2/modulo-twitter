import React, {useState} from "react";
import olho from "../../assets/olho.png"
import "./field-input.css"
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";


function FieldInput({type, ...props}) {
    
    const [showPassword, setShowPassword] = useState(false)
    
    const passwordVisibility = () => {
      if (type === "password") {
        console.log("Clicou no ícone do olho");
        setShowPassword(!showPassword);
        
      }
    };
   
    return(
        <div className="field">
            
            <input className="input" {...props}
            type={showPassword && type ==="password" ? "text" : type}
            {...props}
            />

            {type === "password" ? (
              showPassword ? (
                <AiFillEyeInvisible
                  className="icon_eye"
                  onClick={passwordVisibility}
                />
                ) : (
                <AiFillEye
                  className="icon_eye"
                  onClick={passwordVisibility}
                />
                )
            ) : null}
        </div>
  );
}

export default FieldInput