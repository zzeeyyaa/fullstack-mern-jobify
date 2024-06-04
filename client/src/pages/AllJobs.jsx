import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const response = await customFetch.get("http://localhost:5173/api/v1/jobs");
    // const data = response.data;
    // if (typeof data === "object" && data !== null) {
    //   return data;
    // } else {
    //   throw new Error("Invalid content type");
    // }
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Error fetching jobs");
    throw error;
  }
};
const AllJobsContext = createContext();

const AllJobs = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <>
      <AllJobsContext.Provider
        value={{
          data,
        }}
      >
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
