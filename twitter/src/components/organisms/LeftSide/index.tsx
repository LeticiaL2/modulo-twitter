import Menu from "../../molecules/Menu";
import Button from "../../atoms/Button";
import style from "./style.module.scss";
import UserButton from "../../atoms/UserButton";

function LeftSide() {
  return (
    <div className={style.Main}>
      <div>
        <Menu />
        <div style={{ padding: "12px" }}>
          <Button name={"Post"} colorblue={true} link={"home"} />
        </div>
      </div>
      <UserButton
        name={"Entregas da Kiki"}
        user={"kiki_"}
        img={"./images/user.jpg"}
      />
    </div>
  );
}

export default LeftSide;
