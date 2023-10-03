import style from "@/styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <img src="/logo.png" alt="Qanst" />
      <button className="button">Signin</button>
    </nav>
  );
};

export default Navbar;
