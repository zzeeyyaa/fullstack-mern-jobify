import {
  Link,
  Form,
  useNavigation,
  redirect,
  useActionData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";

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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <p></p>
        <FormRow type="text" name="email"></FormRow>
        <FormRow type="password" name="password"></FormRow>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button className="btn btn-block">Explore</button>
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
