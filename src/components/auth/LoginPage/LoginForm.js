import T from "prop-types";

import useForm from "../../../hooks/useForm";

// const validEmail = ({ email }) => email;
// const validPassword = ({ password }) => password;

function LoginForm({ onSubmit, isLoading }) {
  const {
    formValue: credentials,
    handleChange,
    handleSubmit,
    validate,
  } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const { email, password, remember } = credentials;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="email"
        value={email}
        placeholder="email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="remember"
        checked={remember}
        onChange={handleChange}
      />
      <button disabled={validate(email, password)}>Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  isLoading: T.bool,
  onSubmit: T.func.isRequired,
};

export default LoginForm;
