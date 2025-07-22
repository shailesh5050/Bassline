import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
const NavbarUI = () => {
  const navigate = useNavigate();
  const { isAuth, logoutUser } = useUserContext();
  const logout = () => {
    // Implement logout functionality here
    logoutUser();
    console.log("User logged out");
    // You might want to clear user data or redirect to a different page
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold mb-6">
        {/* Navigation arrows */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black p-2 rounded-full cursor-pointer hover:from-gray-700 hover:to-gray-900 transition-all duration-300 hover:scale-110 shadow-lg"
            onClick={() => navigate(-1)}
          >
            <img src="/left_arrow.png" className="w-full h-full" alt="Go Back" />
          </div>
          <div
            className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black p-2 rounded-full cursor-pointer hover:from-gray-700 hover:to-gray-900 transition-all duration-300 hover:scale-110 shadow-lg"
            onClick={() => navigate(+1)}
          >
            <img src="/right_arrow.png" className="w-full h-full" alt="Go Forward" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full hidden md:block hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Explore Premium
          </button>
          <button className="px-6 py-2 cursor-pointer glass text-white text-sm font-medium rounded-full hidden md:block hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
            Install App
          </button>
          {isAuth ? (
            <button
              onClick={logout}
              className="px-6 py-2 cursor-pointer bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex items-center gap-3 mt-6 mb-8">
        <button className="bg-gradient-to-r from-white to-gray-100 text-black px-6 py-2 rounded-full cursor-pointer font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-300 hover:scale-105 shadow-lg">
          All
        </button>
        <button className="glass text-white px-6 py-2 rounded-full cursor-pointer font-medium hidden md:block hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
          Music
        </button>
        <button className="glass text-white px-6 py-2 rounded-full cursor-pointer font-medium hidden md:block hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
          Podcasts
        </button>
        <button
          className="glass text-white px-6 py-2 rounded-full cursor-pointer font-medium md:hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg"
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </button>
      </div>
    </>
  );
};

export default NavbarUI;
