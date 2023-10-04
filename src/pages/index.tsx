import style from "@/styles/Home.module.css";
import { useRecoilValue } from "recoil";
import authState from "@/recoil/auth";
import { signIn } from "next-auth/react";
import Popup from "@/components/Popup";

export default function Home() {
  const auth = useRecoilValue(authState);

  return (
    <>
      <Popup />
      <main className={style.home}>
        <div className={style.detail}>
          <h1>Transform Questions into Conversations</h1>
          <p>
            Your hub for collaborative questioning,
            <br />
            form creation, and shared insights.
          </p>

          {auth ? (
            <div className={style.auth}>
              <button className={`button ${style.button}`}>Host QnA</button>

              <p>--- or ---</p>

              <div className={style.join}>
                <input type="text" placeholder="Enter id to join QnA" />
                <button>join</button>
              </div>
            </div>
          ) : (
            <button
              className={`button ${style.button}`}
              onClick={() => {
                signIn();
              }}>
              Get started <span>&#10230;</span>
            </button>
          )}
        </div>

        <img src="/home.png" alt="home" className={auth ? style.image : ""} />
      </main>
    </>
  );
}
