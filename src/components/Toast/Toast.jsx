import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toast.css";

export function Toast() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
      limit={3}
    />
  );
}

export function Notify(data, options) {
  if (!data || !data.message) {
    return null;
  }

  switch (data.type) {
    case "success":
      toast.success(data.message, options);
      break;
    case "error":
      toast.error(data.message, options);
      break;
    case "info":
      toast.info(data.message, options);
      break;
    default:
      toast(data.message, options);
  }
}
