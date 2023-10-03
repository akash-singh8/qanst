import style from "@/styles/Navbar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import authState from "@/recoil/auth";
import { useSetRecoilState } from "recoil";

const Navbar = () => {
  const session = useSession();

  const setAuth = useSetRecoilState(authState);
  setAuth(session.data !== null);

  console.log("=== Inside Navbar === ");
  console.log(session);

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
