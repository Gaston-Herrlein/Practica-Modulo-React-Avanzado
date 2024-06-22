import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";
import { logout } from "../../../store/actions";

import { ConfirmationButton } from "../../common";
// import { logout } from "../service";
// import { useAuth } from "../context";

const AuthButton = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);

  // const { isLogged, handleLogout } = useAuth();

  const handleLogoutConfirm = async () => {
    // await logout();
    dispatch(logout());
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

export default AuthButton;
