import style from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={style.home}>
      <div className={style.detail}>
        <h1>Transform Questions into Conversations</h1>
        <p>
          Your hub for collaborative questioning,
          <br />
          form creation, and shared insights.
        </p>

        <button className="button">
          Get started <span>&#10230;</span>
        </button>
      </div>

      <img src="/home.png" alt="home" />
    </main>
  );
}
