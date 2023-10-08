import style from "@/styles/Question.module.css";
import { useRecoilValue } from "recoil";
import userState from "@/recoil/user";
import { useEffect, useState } from "react";

type QueData = {
  id: string;
  content: string;
  user: any;
  answers: any;
  date: string;
  votes: any;
};

const Question = ({ id, content, user, answers, date, votes }: QueData) => {
  const [answer, setAnswer] = useState("");
  const [vote, setVote] = useState(false);
  const currUser = useRecoilValue(userState);

  const postAnswer = async () => {
    setAnswer("");

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
  };

  const voteQuestion = async () => {
    setVote(true);
    const voteElement = document.querySelector(
      `#Que_${id.split("-")[4]} .${style.votes}`
    ) as HTMLDivElement;
    const voteCount = voteElement.querySelector("p") as HTMLParagraphElement;
    const voteSvg = voteElement.querySelector("svg") as SVGElement;

    voteElement.title = "already voted";
    voteCount.innerText = `${votes.length + 1}`;
    voteSvg.style.fill = "#ff4141aa";
    voteSvg.style.stroke = "#ff8181aa";
    voteSvg.style.transform = "none";

    const post = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionId: id,
        userId: currUser.email,
      }),
    });

    if (post.status !== 201) {
      const data = await post.json();
      alert(data.message);
      return;
    }
  };

  return (
    <div className={style.question} id={"Que_" + id.split("-")[4]}>
      <img src={user?.pictureUrl} alt="temp" className={style.pic} />

      <div className={style.detail}>
        <p>{content}</p>
        <div className={style.votes} title="vote">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              vote
                ? alert("You've already voted the question!")
                : voteQuestion();
            }}>
            <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon>
          </svg>
          <p>{votes.length}</p>
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
        <button onClick={postAnswer} disabled={answer ? false : true}>
          post
        </button>
      </div>
    </div>
  );
};

export default Question;
