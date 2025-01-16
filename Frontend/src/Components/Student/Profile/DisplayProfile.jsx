
import React from 'react';
import { PencilIcon } from "@heroicons/react/solid";



const ProfileDisplay = ({ profileData, setIsEditing }) => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
      <div className="flex flex-col w-full max-w-screen-xl p-8 mx-auto md:flex-row">
        <div className="flex flex-col items-center justify-center p-8 md:w-1/3">
          <div className="w-[150px] h-[150px] border-4 border-black rounded-full overflow-hidden mb-4">
            <img
              src="https://ik.imagekit.io/mino2112/css%20driving%20skl/woman.png?updatedAt=1725791888913"
              alt="Profile"
            />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">{profileData.name}</h2>
          <h3 className="text-xl text-gray-700">{profileData.year}</h3>
          <h4 className="text-gray-800 text-md">{profileData.department}</h4>
        </div>

        <div className="flex flex-col justify-center p-8 md:w-2/3">
         
          <div className="p-6 mb-6 text-gray-800 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-[#039ee3] pb-2">Academic Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Section</p>
                <p className="text-lg font-medium">{profileData.section}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Register Number</p>
                <p className="text-lg font-medium">{profileData.register_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="text-lg font-medium">{profileData.roll_no}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Batch</p>
                <p className="text-lg font-medium">{profileData.batch}</p>
              </div>
            </div>
          </div>

         
          <div className="p-6 text-gray-800 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-[#039ee3] pb-2">Incharge</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500">Placement Student Head</p>
                <p className="text-lg font-medium">{profileData.placement_head}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class Incharge</p>
                <p className="text-lg font-medium">{profileData. class_incharge}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Placement Staff Head</p>
                <p className="text-lg font-medium">{profileData.staff_incharge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-8 right-8 p-4 bg-[#039ee3] text-white rounded-full shadow-lg hover:bg-[#0288d1] cursor-pointer"
        title="Edit Profile"
      >
        <PencilIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProfileDisplay;
