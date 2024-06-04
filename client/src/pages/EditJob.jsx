import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { JOB_STATUS, JOB_TYPE } from "../../../server/utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import axios from "axios";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `http://localhost:5173/api/v1/jobs/${params.id}`
    );
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(
      `http://localhost:5173/api/v1/jobs/${params.id}`,
      data
    );
    toast.success("Job edited successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    TransformStream.error(error?.response?.data?.message);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  const params = useParams();
  console.log(params);
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
