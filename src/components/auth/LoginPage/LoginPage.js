import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { authLogin, uiResetError } from "../../../store/actions";
import { getUi } from "../../../store/selectors";

import LoginForm from "./LoginForm";

function LoginPage() {
  const { pending: isFetching, error } = useSelector(getUi);

  const dispatch = useDispatch();

  const resetError = () => dispatch(uiResetError());

  const handleSubmit = async (credentials) => {
    dispatch(authLogin(credentials));
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} isLoading={isFetching} />
      {isFetching && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
