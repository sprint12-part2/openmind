import styles from "./PostListHeader.module.css";
import { Link } from "react-router-dom";
import { LinkButton } from "@components/Button";
import { Icon } from "@components/Icon";
import logo from "/src/assets/img/common/logo.svg";

export default function PostListHeader() {
  return (
    <div className={styles.header__container}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img src={logo} alt="오픈마인드 로고" />
          </Link>
        </div>
        <LinkButton>
          답변하러 가기
          <Icon name="arrowRight" size={18}></Icon>
        </LinkButton>
      </div>
      {/* <h1 className={styles.title}>누구에게 질문할까요?</h1> */}
    </div>
  );
}
