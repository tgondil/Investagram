import React from "react";
import Sidebar from "../../components/sidebar";
import { IoHomeOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import Feed from "@/components/feed";

export default function page() {
  return (
    
    <main className="h-screen bg-shark-950 w-full overflow-hidden">
        
      <div className="flex">
        <Sidebar className="w-1/5"></Sidebar>
        <div className="w-10/12 h-screen">
          <div
            id="info"
            className="flex flex-col justify-center  items-center h-full"
          >
            <div className="mt-4 w-4/5 h-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center gap-10 h-2/5">
              
                <div className="w-40 h-40 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="placeholder" className="object-contain rounded-full" />
                </div>
                <div>
                  <h1 className="text-3xl flex justify-center items-center font-poppins font-normal animate-text bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent">
                    therealtanayg
                  </h1>
                  <button
                    class="text-m mt-6 font-semibold 
                bg-tacao-300 w-full flex justify-center items-center text-white rounded-lg
                px-6 py-2 block shadow-xl hover:animate-text group hover:font-bold hover:bg-gradient-to-r  hover:from-teal-500 hover:via-tacao-300 hover:to-teal-500 hover:bg-clip-text hover:text-transparent"
                  >
                    Edit Profile{" "}
                    <LuPencil className="ml-2 group-hover:text-teal-500" />
                  </button>
                  <div className="flex justify-center items-center gap-4">
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">10</span> Friends
                    </h1>
                    <h1 className="text-tacao-300 text-m font-normal mt-6 flex justify-center items-center">
                      <span className="font-bold mr-1">2</span> Posts
                    </h1>
                  </div>
                </div>
            </div>
              <div className="h-1/5 w-full flex justify-center items-center border-b border-dotted">
                <div className="w-1/3">
                <h1 className="text-tacao-300 text-m font-bold"> 
                    Tanay Gondil
                </h1>
                <h1 className="text-tacao-300 mt-2">
                    @purduecs || Pune
                </h1>
                <div className="flex justify-center items-center">
                <h1 className=" animate-text w-1/3 bg-gradient-to-r from-teal-500 via-tacao-300 to-teal-500 bg-clip-text text-transparent my-10 mt-7 pb-3 text-xl font-semibold flex justify-center border-b-2 border-teal-500">
                    My Posts
                </h1>
                </div>
                
                </div>
                
              </div>
              <Feed className="w-5/12"></Feed>
            </div>
            
            
            
          </div>
          
        </div>
      </div>
    </main>
  );
}
