import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`http://localhost:5173/api/v1/jobs/${params.id}`);
    // queryClient.invalidateQueries(['jobs']);

    toast.success("Job deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("/dashboard/all-jobs");
};
