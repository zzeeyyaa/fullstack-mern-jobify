import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="text" name="email"></FormRow>
        <FormRow type="password" name="password"></FormRow>
        <button className="btn btn-block">Login</button>
        <button className="btn btn-block">Explo</button>
        <p>
          Don&apos;t have an account?
          <Link to="/register" className="member-btn">
            Register here
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
