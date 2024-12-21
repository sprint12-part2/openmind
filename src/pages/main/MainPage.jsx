import IntroHeader from "./components/IntroHeader";
import IntroForm from "./components/IntroForm";
import IntroLottie from "./components/IntroLottie";
import IntroWrapper from "./components/IntroWrapper";

export default function MainPage() {
  return (
    <>
      <IntroWrapper>
        <IntroHeader />
        <IntroForm />
      </IntroWrapper>
      <IntroLottie />
    </>
  );
}
