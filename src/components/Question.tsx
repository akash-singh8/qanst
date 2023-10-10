import style from "@/styles/Question.module.css";
import { useRecoilValue } from "recoil";
import userState from "@/recoil/user";
import { useEffect, useState } from "react";
import View from "./View";

type QueData = {
  id: string;
  content: string;
  user: any;
  answers: any;
  date: string;
  votes: any;
};

const Question = ({ id, content, user, answers, date, votes }: QueData) => {
  const [vote, setVote] = useState(false);
  const currUser = useRecoilValue(userState);

  useEffect(() => {
    const voteIndex = votes.findIndex(
      (vote: any) => vote.userId === currUser.email
    );

    if (voteIndex !== -1) {
      setVote(true);
      const voteElement = document.querySelector(
        `#Que_${id.split("-")[4]} .${style.votes}`
      ) as HTMLElement;

      const voteSvg = voteElement.querySelector("svg") as SVGElement;

      voteSvg.style.fill = "#ff4141aa";
      voteSvg.style.stroke = "#ff8181aa";
      voteSvg.style.transform = "none";

      voteElement.title = "already voted";
    }
  }, [votes, currUser]);

  const postAnswer = async () => {
    const ansElement = document.querySelector(
      `#Que_${id.split("-")[4]} .${style.ans_input}`
    ) as HTMLDivElement;
    const ansInput = ansElement.querySelector("input") as HTMLInputElement;
    const ansButton = ansElement.querySelector("button") as HTMLButtonElement;

    ansButton.disabled = true;
    ansButton.innerText = "....";

    const loadingId = setInterval(() => {
      ansButton.innerText += ".";
      if (ansButton.innerText.length > 5) {
        ansButton.innerText = ".";
      }
    }, 200);

    const post = await fetch("http://localhost:3000/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: ansInput.value,
        questionId: id,
        userId: currUser.email,
      }),
    });

    if (post.status !== 201) {
      const data = await post.json();
      alert(data.message);
    }

    clearInterval(loadingId);
    ansButton.innerText = "post";
    ansButton.disabled = false;
    ansInput.value = "";
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
      <View user={user} createdAt={date} />

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
            <View user={ans.user} createdAt={ans.createdAt} />
            <p>{ans.content}</p>
          </div>
        ))}
      </div>

      <div className={style.ans_input}>
        <input type="text" placeholder="write a answer..." />
        <button onClick={postAnswer}>post</button>
      </div>
    </div>
  );
};

export default Question;
