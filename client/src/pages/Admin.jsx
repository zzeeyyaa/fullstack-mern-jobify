import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get(
      // "http://localhost:5173/api/v1/user/admin/app-stats"
      // "http://localhost:5000/api/v1/user/admin/app-stats"
      "/user/admin/app-stats"
    );
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fceec7"
        icon=<FaSuitcaseRolling />
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f0"
        icon=<FaCalendarCheck />
      />
    </Wrapper>
  );
};

export default Admin;
