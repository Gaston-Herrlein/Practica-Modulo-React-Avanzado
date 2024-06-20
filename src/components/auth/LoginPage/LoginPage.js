import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context";
import { login } from "../service";
import LoginForm from "./LoginForm";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = useAuth();
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const resetError = () => setError(null);

  const handleSubmit = async (credentials) => {
    setIsLoading(true);
    try {
      await login(credentials);
      setIsLoading(false);
      handleLogin();
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
