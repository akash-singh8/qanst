import style from "@/styles/Question.module.css";
import { useRecoilValue } from "recoil";
import userState from "@/recoil/user";
import { useEffect, useState } from "react";
import View from "./View";
import { socket } from "@/pages/qna/[formId]";

type QueData = {
  id: string;
  content: string;
  user: any;
  ianswers: any;
  date: string;
  votes: any;
  checkUser: any;
  room: string;
};

const Question = ({
  id,
  content,
  user,
  ianswers,
  date,
  votes,
  checkUser,
  room,
}: QueData) => {
  const [vote, setVote] = useState(false);
  const currUser = useRecoilValue(userState);

  const [answers, setAnswers] = useState(ianswers);

  useEffect(() => {
    if (socket) {
      socket.on("receive_answer", (answer: any) => {
        if (answer.qid === id) {
          setAnswers((prevData: any) =>
            prevData ? [...prevData, answer] : [answer]
          );
        }
      });

      socket.on("set_vote", (data: any) => {
        if (data.qid === id) {
          handleVote(id, data.uid, true);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    const voteIndex = votes.findIndex(
      (vote: any) => vote.userId === currUser.email
    );

    if (voteIndex !== -1) {
      handleVote(id, currUser.email as string, false);
    }
  }, [votes, currUser]);

  function handleVote(qid: string, uid: string, vote: boolean) {
    const voteElement = document.querySelector(
      `#Que_${qid.split("-")[4]} .${style.votes}`
    ) as HTMLElement;
    const voteCount = voteElement.querySelector("p") as HTMLParagraphElement;
    const voteSvg = voteElement.querySelector("svg") as SVGElement;

    if (vote) voteCount.innerText = `${parseInt(voteCount.innerText) + 1}`;

    if (currUser.email === uid) {
      setVote(true);
      voteSvg.style.fill = "#ff4141aa";
      voteSvg.style.stroke = "#ff8181aa";
      voteSvg.style.transform = "none";

      voteElement.title = "already voted";
    }
  }

  const postAnswer = async () => {
    if (!checkUser()) {
      return;
    }

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

    const post = await fetch("/api/answer", {
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

    const data = await post.json();

    if (post.status === 201) {
      const newAns = {
        ansId: data.ansId,
        qid: id,
        user: {
          name: currUser.name,
          pictureUrl: currUser.image,
        },
        content: ansInput.value,
        createdAt: new Date().toString(),
      };

      socket.emit("post_answer", {
        answer: newAns,
        room: room,
      });

      setAnswers((prevData: any) =>
        prevData ? [...prevData, newAns] : [newAns]
      );
    } else {
      alert(data.message);
    }

    clearInterval(loadingId);
    ansButton.innerText = "post";
    ansButton.disabled = false;
    ansInput.value = "";
  };

  const voteQuestion = async () => {
    if (!checkUser()) {
      return;
    }

    const voteCount = document.querySelector(
      `#Que_${id.split("-")[4]} .${style.votes} p`
    ) as HTMLParagraphElement;
    const currVoteCount = voteCount.innerText;
    voteCount.innerText = "...";

    const loadingId = setInterval(() => {
      voteCount.innerText += ".";
      if (voteCount.innerText.length > 4) {
        voteCount.innerText = ".";
      }
    }, 150);

    const post = await fetch(`/api/vote`, {
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

    clearInterval(loadingId);
    voteCount.innerText = currVoteCount;
    handleVote(id, currUser.email as string, true);

    const newVote = {
      qid: id,
      uid: currUser.email,
    };

    socket.emit("vote", {
      vote: newVote,
      room,
    });
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
