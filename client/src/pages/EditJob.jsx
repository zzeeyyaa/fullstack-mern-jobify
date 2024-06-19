import { Form, redirect, useLoaderData } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../server/utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      console.log(data);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);

      toast.success("Job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Demo User. Read Only!") {
        toast.error("Job edit failed: Demo User. Read Only!");
      } else {
        toast.error(errorMessage);
      }
      return redirect("/dashboard/all-jobs");
      // TransformStream.error(error?.response?.data?.message);
      // return error;
    }
  };

const EditJob = () => {
  // const { job } = useLoaderData();
  // const params = useParams();
  // console.log(params);
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className=" form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.location}
          />
          <FormRowSelect
            type="text"
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            type="text"
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
          />
        </div>
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
};

export default EditJob;
