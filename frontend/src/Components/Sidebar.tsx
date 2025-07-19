import { useNavigate } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";
import { useUserContext } from "../context/UserContext";

const SidebarUI = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      {/* Top Section */}
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img src="/home.png" alt="Home" className="w-6" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img src="/search.png" alt="Search" className="w-6" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/stack.png" className="w-8" alt="Library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/arrow.png" className="w-8" alt="Arrow" />
            <img src="/plus.png" className="w-8" alt="Add" />
          </div>
        </div>

        {/* Playlist Card Placeholder */}
        <div onClick={() => { navigate('/playlist') }}>
          <PlaylistCard />
        </div>

        <div>
          {/* Insert <PlayListCard /> here if needed */}
          <div className="bg-gray-800 h-20 m-4 rounded"></div>
        </div>

        {/* Podcast Promo Card */}
        <div className="p-4 m-2 bg-[#121212] rounded font-semibold flex flex-col items-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">we'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
            Browse Podcasts
          </button>
        </div>

        {/* Admin Button Placeholder */}
        {user?.role === "admin" && (
          <button onClick={()=>{navigate('/admin')}} className="px-4 ml-5 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 cursor-pointer">
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarUI;
