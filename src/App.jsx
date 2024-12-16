import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import FeedContextProvider from "@context/FeedContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "@components/Toast";

const queryClient = new QueryClient();

export default function App() {
  return (
    <FeedContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toast />
      </QueryClientProvider>
    </FeedContextProvider>
  );
}
