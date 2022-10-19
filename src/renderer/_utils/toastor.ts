import { toast } from "react-toastify";

export const notifyGood = ({ message }: { message: string }) =>
  toast.success(message, { position: toast.POSITION.TOP_RIGHT });

export const notifyError = ({ message }: { message: string }) =>
  toast.error(message, { position: toast.POSITION.TOP_RIGHT });
