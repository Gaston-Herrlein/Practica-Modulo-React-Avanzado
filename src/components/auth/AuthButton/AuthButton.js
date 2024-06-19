import { Link } from 'react-router-dom';

import { ConfirmationButton } from '../../common';
import { logout } from '../service';
import { useAuth } from '../context';

const AuthButton = () => {
  const { isLogged, handleLogout } = useAuth();

  const handleLogoutConfirm = async () => {
    await logout();
    handleLogout();
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
