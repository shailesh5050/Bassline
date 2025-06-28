import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser,btnLoading } = useUserContext();
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser(name, email, password);
    };
  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Register To Spotify
        </h2>
        <form className="mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button className="auth-btn w-full" onClick={handleRegister} disabled={btnLoading}>
            {btnLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to={"/login"}
            className="text-sm text-gray-400 hover:text-gray-300"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
