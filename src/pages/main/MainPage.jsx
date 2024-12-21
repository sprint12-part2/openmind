import MainLogo from "./components/MainLogo";
import IntroHeader from "./components/IntroHeader";
import IntroForm from "./components/IntroForm";
import IntroLottie from "./components/IntroLottie";
import IntroWrapper from "./components/IntroWrapper";
import MainPageInner from "./components/MainPageInner";

export default function MainPage() {
  return (
    <IntroWrapper>
      <MainPageInner>
        <IntroHeader />
        <MainLogo />
        <IntroForm />
      </MainPageInner>
      <IntroLottie />
    </IntroWrapper>
  );
}
