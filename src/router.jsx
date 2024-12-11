import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/main/MainPage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostListPage from "./pages/post/PostListPage";
import PostAnswerPage from "./pages/post/PostAnswerPage";
import SamplePage from "./pages/sample/SamplePage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/list",
        element: <PostListPage />,
      },
      {
        path: "/post",
        children: [
          {
            path: ":id",
            element: <PostDetailPage />,
          },
          {
            path: ":id/answer",
            element: <PostAnswerPage />,
          },
        ],
      },
      {
        path: "/sample",
        element: <SamplePage />,
      },
    ],
  },
]);
