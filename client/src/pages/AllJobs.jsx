import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  console.log(data);
  return (
    <>
      <AllJobsContext.Provider
        value={{
          data,
          searchValues,
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
