import { RouterProvider } from "react-router-dom";
import SamplePage from "./pages/sample/SamplePage";
import { router } from "./router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SamplePage />
    </>
  );
}
