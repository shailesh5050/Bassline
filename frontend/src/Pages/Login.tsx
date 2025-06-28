import { Link, useNavigate } from "react-router-dom";
import { use, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Login from './Login';
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, btnLoading } = useUserContext();
  const navigate = useNavigate();     
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    await loginUser(email, password, navigate);
    setEmail("");
    setPassword("");
  }
  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Login To Spotify
        </h2>

        <form className="mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email or username
            </label>
            <input
              type="email"
              placeholder="Email or username"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" onClick={handleLogin}>

            {btnLoading ? (
              <span >Login...</span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/register"
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Don't have an Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
