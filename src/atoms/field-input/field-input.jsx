import React, {useState} from "react";
import olho from "../../assets/olho.png"
import "./field-input.css"




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
            {type === "password" && (
              <img 
              src={olho}
              alt="foto icone olho"
              className="icon_eye"
              onMouseDown={passwordVisibility}
              />
            )}
        </div>
    );
}

export default FieldInput