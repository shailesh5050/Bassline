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
      <div className="w-full flex justify-between items-center font-semibold">
        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <img
            src="/left_arrow.png"
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(-1)}
            alt="Go Back"
          />
          <img
            src="/right_arrow.png"
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            onClick={() => navigate(+1)}
            alt="Go Forward"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Explore Premium
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Install App
          </p>
          {isAuth ? (
            <p
              onClick={logout}
              className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full"
            >
              Logout
            </p>
          ) : (
            <p
              onClick={() => navigate("/login")}
              className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full"
            >
              Login
            </p>
          )}
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Music
        </p>
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Podcasts
        </p>
        <p
          className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer md:hidden"
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </p>
      </div>
    </>
  );
};

export default NavbarUI;
