import style from "@/styles/Popup.module.css";

const Popup = () => {
  return (
    <div className={style.popup}>
      <div className={style.container}>
        <img src="/form.png" alt="form" />

        <input
          type="text"
          placeholder="Enter title for QnA"
          className={style.title}
        />

        <button className="button">Create QnA</button>
      </div>
    </div>
  );
};

export default Popup;
