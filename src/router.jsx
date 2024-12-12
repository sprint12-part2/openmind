import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/main/MainPage";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostListPage from "./pages/post/PostListPage";
import PostAnswerPage from "./pages/post/PostAnswerPage";
import SamplePage from "./pages/sample/SamplePage";
import PostDetailLayout from "./pages/post/components/PostDetailLayout";
import PostListLayout from "./pages/post/components/PostListLayout";

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
        element: <PostListLayout />,
        children: [{ index: true, element: <PostListPage /> }],
      },
      {
        path: "/post",
        element: <PostDetailLayout />,
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
