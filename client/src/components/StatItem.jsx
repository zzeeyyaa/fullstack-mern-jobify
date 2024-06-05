import PropTypes from "prop-types";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

StatItem.propTypes = {
  icon: PropTypes.object.isRequired, // Menggunakan PropTypes.elementType untuk komponen ikon
  count: PropTypes.number.isRequired, // Menjadikan count sebagai required dengan tipe number
  title: PropTypes.string.isRequired, // Menjadikan title sebagai required dengan tipe string
  color: PropTypes.string, // Membiarkan color sebagai string opsional
  bcg: PropTypes.string, // Membiarkan bcg sebagai string opsional
};

export default StatItem;
