import style from "@/styles/Popup.module.css";
import { useSetRecoilState } from "recoil";
import popState from "@/recoil/popup";
import { useEffect } from "react";

const Popup = () => {
  const setPopup = useSetRecoilState(popState);

  useEffect(() => {
    const cross = document.querySelector(`.${style.cross}`);
    const popup = document.querySelector(`.${style.popup}`);

    popup?.classList.add(style.fadein);

    function clickHandler() {
      popup?.classList.add(style.fadeout);
      setTimeout(() => {
        setPopup(false);
      }, 200);
      cross?.removeEventListener("click", clickHandler);
    }

    cross?.addEventListener("click", clickHandler);
  }, []);

  return (
    <div className={style.popup}>
      <div className={style.container}>
        <img src="/form.png" alt="form" className={style.form} />

        <input
          type="text"
          placeholder="Enter title for QnA"
          className={style.title}
        />

        <button className="button">Create QnA</button>

        <img src="/cross.svg" alt="cross" className={style.cross} />
      </div>
    </div>
  );
};

export default Popup;
