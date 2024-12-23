import { useRef } from "react";
import { MyFeedsButton, MyFeeds } from "@components/MyFeeds";
import MainPageInputForm from "./MainPageInputForm";
import styles from "./IntroForm.module.css";
import { useFeed } from "@context/FeedContext";
import { Notify } from "@components/Toast";
import { MESSAGES } from "@constants/messages";

function IntroForm() {
  const myFeedsModalRef = useRef(null);

  const { feeds } = useFeed();

  const handleMyFeedsClick = () => {
    if (feeds.length === 0) {
      Notify({ type: "info", message: MESSAGES.SUBJECT.EMPTY });
    } else {
      myFeedsModalRef.current?.open();
    }
  };

  return (
    <section className={styles.section}>
      <MainPageInputForm />
      <MyFeedsButton onClick={handleMyFeedsClick} />
      <MyFeeds ref={myFeedsModalRef} />
    </section>
  );
}

export default IntroForm;
