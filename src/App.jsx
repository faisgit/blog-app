import { useEffect, useState } from "react";
import conf from "./conf/conf";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header, Footer} from './components/index'
function App() {
  const [loading, setLoading] = useState(true);
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
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="bg-black/80">
      
      <Header />
      <h1>Home Page</h1>
      <Footer />
    </div>
  ) : (
    <div>
      <h1>Loading</h1>
    </div>
  );
}

export default App;
