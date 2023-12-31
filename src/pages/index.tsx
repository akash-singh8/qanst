import style from "@/styles/Home.module.css";
import { useRecoilState } from "recoil";
import popState from "@/recoil/popup";
import { getSession, signIn } from "next-auth/react";
import Popup from "@/components/Popup";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Home({ session }: { session: any }) {
  const [popup, setPopup] = useRecoilState(popState);
  const router = useRouter();

  const joinQnA = () => {
    const qnaId = document.querySelector(
      `.${style.join} input`
    ) as HTMLInputElement;
    router.push(`/qna/${qnaId.value}`);

    qnaId.value = "";
  };

  return (
    <>
      {popup ? <Popup /> : <></>}

      <main className={style.home}>
        <div className={style.detail}>
          <h1>Transform Questions into Conversations</h1>
          <p>
            Your hub for collaborative questioning,
            <br />
            form creation, and shared insights.
          </p>

          {session ? (
            <div className={style.auth}>
              <button
                className={`button ${style.button}`}
                onClick={() => {
                  setPopup(true);
                }}>
                Host QnA
              </button>

              <p>--- or ---</p>

              <div className={style.join}>
                <input type="text" placeholder="Enter id to join QnA" />
                <button onClick={joinQnA}>join</button>
              </div>
            </div>
          ) : (
            <button
              className={`button ${style.button}`}
              onClick={() => {
                signIn("github");
              }}>
              Get started <span>&#10230;</span>
            </button>
          )}
        </div>

        <img
          src="/home.png"
          alt="home"
          className={session ? style.image : ""}
        />
      </main>
    </>
  );
}
