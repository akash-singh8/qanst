import style from "@/styles/Navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import authState from "@/recoil/auth";
import userState from "@/recoil/user";
import { useSetRecoilState } from "recoil";

const Navbar = () => {
  const session = useSession();

  const setUser = useSetRecoilState(userState);
  const setAuth = useSetRecoilState(authState);
  setAuth(session.data !== null);

  if (session.data?.user) {
    setUser(session.data.user);
  }

  return (
    <nav className={style.nav}>
      <img src="/logo.png" alt="Qanst" />
      {session.data ? (
        <button
          className="button"
          onClick={() => {
            signOut();
          }}>
          Logout
        </button>
      ) : (
        <button
          className="button"
          onClick={() => {
            signIn();
          }}>
          Signin
        </button>
      )}
    </nav>
  );
};

export default Navbar;
