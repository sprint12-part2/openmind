import { Outlet, useNavigation } from "react-router-dom";
import { Loading } from "./Loding";

export function Layout() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && <Loading />}
      <Outlet />
    </>
  );
}
