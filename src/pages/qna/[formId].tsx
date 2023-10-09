import { useRouter } from "next/router";
import style from "@/styles/Form.module.css";
import Question from "@/components/Question";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userState from "@/recoil/user";
import View from "@/components/View";

const Form = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const formId = router.query.formId;
  const [form, setForm] = useState<any>();

  useEffect(() => {
    async function getForm() {
      const form = await fetch(`http://localhost:3000/api/qna?fid=${formId}`);

      if (form.status !== 200) {
        setForm(400);
        return;
      }

      const data = await form.json();
      setForm(data);
    }

    if (formId) getForm();
  }, [formId]);

  const postQuestion = async () => {
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

    if (post.status !== 201) {
      const data = await post.json();
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
        form !== 400 ? (
          <>
            <div className={style.head}>
              <View user={form.host} createdAt={form.createdAt} />
              <div className={style.detail}>
                <p>{new Date(form.createdAt).toDateString()}</p>
                <h1>{form.title}</h1>
              </div>
            </div>

            <div>
              {form.questions.map((que: any) => (
                <Question
                  key={que.qid}
                  id={que.qid}
                  content={que.content}
                  user={que.user}
                  answers={que.answers}
                  date={que.createdAt}
                  votes={que.votes}
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
        )
      ) : (
        <div className={style.loading}>
          <img src="/loading.svg" alt="loading" />
        </div>
      )}
    </main>
  );
};

export default Form;
