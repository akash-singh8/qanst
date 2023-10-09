import style from "@/styles/Navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import authState from "@/recoil/auth";
import userState from "@/recoil/user";
import { useSetRecoilState } from "recoil";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
  const session = useSession();

  const setUser = useSetRecoilState(userState);
  const setAuth = useSetRecoilState(authState);
  setAuth(session.data !== null);

  if (session.data?.user) {
    setUser(session.data.user);
  }

  useEffect(() => {
    const userButton = document.querySelector(`.${style.user}`);
    const popup = document.querySelector(`.${style.popup}`) as HTMLDivElement;

    function hidePopup() {
      popup.style.top = "100%";
      popup.style.opacity = "0";
      setTimeout(() => {
        popup.style.display = "none";
      }, 250);

      document.removeEventListener("click", hidePopup);
      userButton?.addEventListener("click", showPopup);
    }

    function showPopup() {
      popup.style.display = "block";
      setTimeout(() => {
        popup.style.top = "85%";
        popup.style.opacity = "1";
      }, 10);

      userButton?.removeEventListener("click", showPopup);

      setTimeout(() => {
        document.addEventListener("click", hidePopup);
      }, 10);
    }

    userButton?.addEventListener("click", showPopup);
  }, [session.data]);

  return (
    <nav className={style.nav}>
      <Link href={"/"}>
        <img src="/logo.png" alt="Qanst" />
      </Link>
      {session.data ? (
        <div className={style.logged_user}>
          <button className={`${style.user} button`}>
            <span>{session.data.user?.name?.split(" ")[0]}</span>
            <img src={session.data.user?.image as string} alt="user" />
          </button>

          <div className={style.popup}>
            <p>Hello,</p>
            <strong>{session.data.user?.name?.split(" ")[0]}</strong>

            <button
              className="button"
              onClick={() => {
                signOut();
              }}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <button
          className="button"
          onClick={() => {
            signIn("google");
          }}>
          Signin
        </button>
      )}
    </nav>
  );
};

export default Navbar;
