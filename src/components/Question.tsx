import style from "@/styles/Question.module.css";
import { useRecoilValue } from "recoil";
import userState from "@/recoil/user";
import { useState } from "react";

type QueData = {
  id: string;
  content: string;
  user: any;
  answers: any;
  date: string;
  votes: number;
};

const Question = ({ id, content, user, answers, date, votes }: QueData) => {
  const [answer, setAnswer] = useState("");
  const currUser = useRecoilValue(userState);

  const postAnswer = async () => {
    const post = await fetch("http://localhost:3000/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: answer,
        questionId: id,
        userId: currUser.email,
      }),
    });

    if (post.status !== 201) {
      const data = await post.json();
      alert(data.message);
    }

    setAnswer("");
  };

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
        <input
          type="text"
          placeholder="write a answer..."
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button onClick={postAnswer}>post</button>
      </div>
    </div>
  );
};

export default Question;
