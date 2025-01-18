import React from 'react';
import PropTypes from 'prop-types';
import { PencilIcon } from "@heroicons/react/solid";

const DisplayProfile = ({ profileData, setIsEditing }) => {
  if (!profileData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
        <p className="text-xl text-gray-600">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
      <div className="flex flex-col w-full max-w-screen-xl p-8 mx-auto md:flex-row">
        {/* Profile Image & Basic Info */}
        <div className="flex flex-col items-center justify-center p-8 md:w-1/3">
          <div className="w-[150px] h-[150px] border-4 border-black rounded-full overflow-hidden mb-4">
            <img
              src="https://ik.imagekit.io/mino2112/css%20driving%20skl/woman.png?updatedAt=1725791888913"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">{profileData.name}</h2>
          <h3 className="text-xl text-gray-700">{profileData.year}</h3>
          <h4 className="text-gray-800 text-md">{profileData.department}</h4>
        </div>

        {/* Academic Details */}
        <div className="flex flex-col justify-center p-8 md:w-2/3">
          <div className="p-6 mb-6 text-gray-800 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-[#039ee3] pb-2">Academic Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <Detail label="Section" value={profileData.section} />
              <Detail label="Register Number" value={profileData.register_number} />
              <Detail label="Roll Number" value={profileData.roll_no} />
              <Detail label="Batch" value={profileData.batch} />
            </div>
          </div>

          {/* Incharge Details */}
          <div className="p-6 text-gray-800 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-[#039ee3] pb-2">Incharge</h3>
            <div className="grid grid-cols-1 gap-4">
              <Detail label="Placement Student Head" value={profileData.placement_head} />
              <Detail label="Class Incharge" value={profileData.class_incharge} />
              <Detail label="Placement Staff Head" value={profileData.staff_incharge} />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
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

// ✅ Add PropTypes Validation
DisplayProfile.propTypes = {
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    section: PropTypes.string,
    register_number: PropTypes.string,
    roll_no: PropTypes.string,
    batch: PropTypes.string,
    placement_head: PropTypes.string,
    class_incharge: PropTypes.string,
    staff_incharge: PropTypes.string,
  }),
  setIsEditing: PropTypes.func.isRequired,
};

// Reusable Component for Profile Details
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium">{value || "N/A"}</p>
  </div>
);

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default DisplayProfile;
