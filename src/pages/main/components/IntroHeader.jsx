import styles from "./IntroHeader.module.css";
import { LinkButton } from "@components/Button";
import { Icon } from "@components/Icon";
import { useNavigate } from "react-router-dom";

function IntroHeader() {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.link}>
        <LinkButton responsive={true} onClick={() => navigate(`/list`)}>
          질문하러 가기 <Icon name="arrowRight" size={18}></Icon>
        </LinkButton>
      </div>
    </div>
  );
}

export default IntroHeader;
