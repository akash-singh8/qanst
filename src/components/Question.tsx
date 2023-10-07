import style from "@/styles/Question.module.css";

type QueData = {
  content: string;
  user: any;
  answers: any;
  date: string;
  votes: number;
};

const Question = ({ content, user, answers, date, votes }: QueData) => {
  return (
    <div className={style.question}>
      <img src={user?.pictureUrl} alt="temp" className={style.pic} />

      <div className={style.detail}>
        <p>{content}</p>
        <div className={style.votes}>
          <img src="/vote-up.svg" alt="vote" />
          <p>{votes}</p>
        </div>
      </div>

      <div className={style.answers}>
        {answers?.map((ans: any) => (
          <div className={style.ans} key={ans.ansId}>
            <img src={ans.user?.pictureUrl} alt="user" />
            <p>{ans.content}</p>
          </div>
        ))}
      </div>

      <div className={style.ans_input}>
        <input type="text" placeholder="write a answer..." />
        <button>post</button>
      </div>
    </div>
  );
};

export default Question;
