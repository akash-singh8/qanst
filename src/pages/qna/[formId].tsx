import { useRouter } from "next/router";
import style from "@/styles/Form.module.css";
import Question from "@/components/Question";

const Form = () => {
  const router = useRouter();
  const formId = router.query.formId;

  return (
    <main className={style.form}>
      <div className={style.head}>
        <img src="/favicon.ico" alt="user" />
        <div className={style.detail}>
          <p>3, Octoer 2023</p>
          <h1>QnA Title</h1>
        </div>
      </div>

      <div>
        <Question />
      </div>

      <div className={style.input_box}>
        <div className={style.input}>
          <img src="/question.svg" alt="ask question" />
          <input type="text" placeholder="Ask a question" />
          <button>post</button>
        </div>
      </div>
    </main>
  );
};

export default Form;
