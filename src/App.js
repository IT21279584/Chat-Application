import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./modules/Dashboard";
import Form from "./modules/Form";

function App() {
  const ProtectRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("user:token") !== null || true;

    if (!isLoggedIn) {
      return <Navigate to={"/users/sign-in"} />;
    } else if (
      isLoggedIn &&
      ["/users/sign-in", "/users/sign-up"].includes(window.location.pathname)
    ) {
      return <Navigate to={"/"} />;
    }

    return children;
  };
  return (
    <div className="bg-[#edf3fc] h-screen flex justify-center items-center">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/users/sign-in"
          element={
            <ProtectRoute>
              <Form isSignPage={true} />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/users/sign-up"
          element={
            <ProtectRoute>
              <Form isSignPage={false} />
            </ProtectRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
