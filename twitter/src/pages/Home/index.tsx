import style from "./style.module.scss";
import Feed from "../../Templates/Feed";

export default function Home() {
  return (
    <>
      <div className={style.DivMain}>
        <Feed />
      </div>
    </>
  );
}
