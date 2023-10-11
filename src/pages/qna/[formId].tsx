import style from "@/styles/Form.module.css";
import Question from "@/components/Question";
import { useRecoilValue } from "recoil";
import userState from "@/recoil/user";
import View from "@/components/View";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export let socket: Socket;

export async function getServerSideProps(context: any) {
  const formId = context.resolvedUrl.slice(5) as string;

  const response = await fetch(`http://localhost:3000/api/qna?fid=${formId}`);

  if (!response.ok) {
    return {
      props: {
        form: null,
      },
    };
  }

  const data = await response.json();

  return {
    props: {
      formId,
      form: data,
    },
  };
}

const Form = ({ formId, form }: { formId: string; form: any }) => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [questions, setQuestions] = useState(form?.questions);

  useEffect(() => {
    console.log("Initializing Socket connections");
    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      socket.emit("join_room", formId.split("-")[4]);
    });

    socket.on("receive_question", (question: any) => {
      setQuestions((prevData: any) => [...prevData, question]);
    });
  };

  function checkUser() {
    if (!user.name) {
      router.push(
        `http://localhost:3000/api/auth/signin?callbackUrl=http://localhost:3000/qna/${formId}`
      );
      return false;
    }

    return true;
  }

  const postQuestion = async () => {
    if (!checkUser()) {
      return;
    }

    const queElement = document.querySelector(
      `.${style.input}`
    ) as HTMLDivElement;
    const queInput = queElement.querySelector("input") as HTMLInputElement;
    const queButton = queElement.querySelector("button") as HTMLButtonElement;

    queButton.disabled = true;
    queButton.innerText = "....";

    const loadingId = setInterval(() => {
      queButton.innerText += ".";
      if (queButton.innerText.length > 5) {
        queButton.innerText = ".";
      }
    }, 200);

    const post = await fetch("http://localhost:3000/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: queInput.value,
        formId: formId,
        userId: user.email,
      }),
    });

    const data = await post.json();

    if (post.status === 201) {
      const newQue = {
        qid: data.qid,
        user: {
          name: user.name,
          email: user.email,
          pictureUrl: user.image,
        },
        createdAt: new Date().toString(),
        content: queInput.value,
        answer: [],
        votes: [],
      };

      socket.emit("post_question", {
        question: newQue,
        room: formId.split("-")[4],
      });

      setQuestions((prevData: any) => [...prevData, newQue]);
    } else {
      alert(data.message);
    }

    clearInterval(loadingId);
    queButton.innerText = "post";
    queButton.disabled = false;
    queInput.value = "";
  };

  return (
    <main className={style.form}>
      {form ? (
        <>
          <div className={style.head}>
            <View user={form.host} createdAt={form.createdAt} />
            <div className={style.detail}>
              <p>{new Date(form.createdAt).toDateString()}</p>
              <h1>{form.title}</h1>
            </div>
          </div>

          <div>
            {questions.map((que: any) => (
              <Question
                key={que.qid}
                id={que.qid}
                content={que.content}
                user={que.user}
                ianswers={que.answers}
                date={que.createdAt}
                votes={que.votes}
                checkUser={checkUser}
                room={formId.split("-")[4]}
              />
            ))}
          </div>

          <div className={style.input_box}>
            <div className={style.input}>
              <img src="/question.svg" alt="ask question" />
              <input type="text" placeholder="Ask a question" />
              <button onClick={postQuestion}>post</button>
            </div>
          </div>
        </>
      ) : (
        <div className={style.badrequest}>
          <img src="/badrequest.svg" alt="bad request" />
        </div>
      )}
    </main>
  );
};

export default Form;
