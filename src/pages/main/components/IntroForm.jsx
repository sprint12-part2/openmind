import styles from "./IntroForm.module.css";
import { useRef } from "react";
import { MyFeedsButton, MyFeeds } from "@components/MyFeeds";
import MainPageInputForm from "./MainPageInputForm";

function IntroForm() {
  const myFeedsModalRef = useRef(null);
  return (
    <section className={styles.section}>
      <MainPageInputForm />
      <MyFeedsButton onClick={() => myFeedsModalRef.current?.open()} />
      <MyFeeds ref={myFeedsModalRef} />
    </section>
  );
}

export default IntroForm;
