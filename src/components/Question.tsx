import style from "@/styles/Question.module.css";

const Question = () => {
  return (
    <div className={style.question}>
      <img src="/cross.svg" alt="temp" className={style.pic} />

      <div className={style.detail}>
        <p>question text</p>
        <div className={style.votes}>
          <img src="/vote-up.svg" alt="vote" />
          <p>49</p>
        </div>
      </div>

      <div className={style.answers}>
        <div className={style.ans}>
          <p>o</p>
          <p>answer text</p>
        </div>
        <div className={style.ans}>
          <p>o</p>
          <p>answer text</p>
        </div>
        <div className={style.ans}>
          <p>o</p>
          <p>answer text</p>
        </div>
        <div className={style.ans}>
          <p>o</p>
          <p>answer text</p>
        </div>
        <div className={style.ans}>
          <p>o</p>
          <p>answer text</p>
        </div>
      </div>

      <div className={style.ans_input}>
        <input type="text" placeholder="write a answer..." />
        <button>post</button>
      </div>
    </div>
  );
};

export default Question;
