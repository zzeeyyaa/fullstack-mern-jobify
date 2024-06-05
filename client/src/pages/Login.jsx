import {
  Link,
  Form,
  useNavigate,
  redirect,
  useActionData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import SubmitBtn from "../components/SubmitBtn.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    console.log(data);
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
    console.log(error);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const errors = useActionData();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("auth/login", data);
      toast.success("Take a test driver");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <p></p>
        <FormRow type="text" name="email"></FormRow>
        <FormRow type="password" name="password"></FormRow>
        <SubmitBtn formBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the App
        </button>
        <p>
          Don&apos;t have an account?
          <Link to="/register" className="member-btn">
            Register here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
