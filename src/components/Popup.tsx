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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = document.querySelector(
      `.${style.container} input`
    ) as HTMLInputElement;
    const button = document.querySelector(
      `.${style.container} button`
    ) as HTMLButtonElement;

    try {
      button.disabled = true;
      button.innerText = "Creating";

      const loadingId = setInterval(() => {
        button.innerText += ".";
        if (button.innerText.length > 12) {
          button.innerText = "Creating";
        }
      }, 250);

      const response = await fetch("http://localhost:3000/api/qna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title?.value,
          email: "developer.akash8@gmail.com",
        }),
      });

      const data = await response.json();

      clearInterval(loadingId);
      title.disabled = true;
      title.value = `http://localhost:3000/qna/${data.formId}`;
      navigator.clipboard.writeText(title.value);
      button.innerText = "Link copied!";
    } catch (err) {
      alert("Error while hosing QnA!\nPlease try later.");
    }
  };

  return (
    <div className={style.popup}>
      <form className={style.container} onSubmit={handleSubmit}>
        <img src="/form.png" alt="form" className={style.form} />

        <input
          type="text"
          placeholder="Enter title for QnA"
          className={style.title}
        />

        <button className="button">Create QnA</button>

        <img src="/cross.svg" alt="cross" className={style.cross} />
      </form>
    </div>
  );
};

export default Popup;
