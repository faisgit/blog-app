import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrirte/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout);
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full "
      onClick={handleLogout}
    >
      LogOut
    </button>
  );
}

export default LogoutBtn;
