import style from "@/styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Link href={"/"}>
        <img src="/logo.png" alt="Qanst" className={style.image} />
      </Link>

      <div>
        <a href="https://github.com/akash-singh8/qanst" target="_blank">
          <img src="/github.svg" alt="github" className={style.social} />
        </a>
        <a href="https://www.linkedin.com/in/akash-singh8/" target="_blank">
          <img src="/linkedin.svg" alt="linkedin" className={style.social} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
