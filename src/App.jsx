import React, { useEffect, useState } from "react";
import conf from "../conf/config";
import { useDispatch } from "react-redux";
import authService from "./appwrirte/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);
  return !loading ? (
    <div>
      <Header />
      <main>
        <h1>User has been login</h1>
      </main>
      <Footer />
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default App;
