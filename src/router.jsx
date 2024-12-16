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
import { loader as PostDetailLoader } from "./pages/post/loader/PostDetailLoader";
import ProtectedRoute from "./pages/post/components/ProtectedRoute";
import PostPageHydrateFallback from "./pages/post/components/PostPageHydrateFallback";

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
        id: "post",
        path: "/post",
        element: <PostDetailLayout />,
        loader: PostDetailLoader,
        hydrateFallbackElement: <PostPageHydrateFallback />,
        children: [
          {
            path: ":id",
            element: <PostDetailPage />,
          },
          {
            path: ":id/answer",
            element: (
              <ProtectedRoute>
                <PostAnswerPage />
              </ProtectedRoute>
            ),
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
