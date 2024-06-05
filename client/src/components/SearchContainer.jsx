import { Form, useSubmit, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, SubmitBtn } from ".";
import {
  JOB_SORT_BY,
  JOB_STATUS,
  JOB_TYPE,
} from "../../../server/utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

function SearchContainer() {
  const { searchValues } = useAllJobsContext();
  // const { search, jobStatus, jobType, sort } = searchValues;
  // const submit = useSubmit();

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow type="search" name="search"></FormRow>
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue="all"
            onChange={(e) => {
              SubmitEvent(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue="all"
            onChange={(e) => {
              SubmitEvent(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="sort"
            name="newest"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue="all"
            onChange={(e) => {
              SubmitEvent(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
}

export default SearchContainer;
