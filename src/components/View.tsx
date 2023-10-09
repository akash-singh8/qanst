import style from "@/styles/View.module.css";
import { useState } from "react";

type ViewData = {
  user: any;
  createdAt: string;
};

const View = ({ user, createdAt }: ViewData) => {
  const [view, setView] = useState(false);
  const time = new Date(createdAt);

  return (
    <div className={style.view}>
      <img
        src={user.pictureUrl}
        alt="user"
        onClick={() => {
          setView(!view);
        }}
      />

      <div
        className={style.box}
        style={view ? { display: "block" } : { display: "none" }}>
        <div className={style.user}>
          <img src={user.pictureUrl} alt="user" />
          <p>{user.name}</p>
        </div>

        <div className={style.time}>
          <h2>Created On:</h2>
          <p>{time.toDateString()}</p>
          <p>{time.toTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
