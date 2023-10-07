import { useRouter } from "next/router";
import style from "@/styles/Form.module.css";
import Question from "@/components/Question";
import { useEffect, useState } from "react";

const Form = () => {
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

  return (
    <main className={style.form}>
      {form ? (
        form !== 400 ? (
          <>
            <div className={style.head}>
              <img src={form.host?.pictureUrl} alt="user" />
              <div className={style.detail}>
                <p>{new Date(form.createdAt).toDateString()}</p>
                <h1>{form.title}</h1>
              </div>
            </div>

            <div>
              {form.questions.map((que: any) => (
                <Question
                  key={que.qid}
                  content={que.content}
                  user={que.user}
                  answers={que.answers}
                  date={que.createdAt}
                  votes={que.votes.length}
                />
              ))}
            </div>

            <div className={style.input_box}>
              <div className={style.input}>
                <img src="/question.svg" alt="ask question" />
                <input type="text" placeholder="Ask a question" />
                <button>post</button>
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
