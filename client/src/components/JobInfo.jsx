import PropTypes from "prop-types";
import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon: Icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">
        <Icon />
      </span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

JobInfo.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

export default JobInfo;
