
import React, { useState, useEffect } from 'react';



const EditProfile = ({ userId, profileData, setProfileData, setIsEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    year: '',
    section: '',
    register_number: '',
    roll_no: '',
    batch: '',
    staff_incharge: '',
    class_incharge: '',
    placement_head: '',
  });

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://placement-connect.onrender.com/getprofile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setIsEditing(false);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-[1000px]">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Profile Details' : 'Enter Profile Details'}
        </h2>
  
        <div className="grid grid-cols-2 gap-6">
         
          <div>
            
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
  
            
            <div className="mb-4">
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Year</option>
                <option value="I Year">I Year</option>
                <option value="II Year">II Year</option>
                <option value="III Year">III Year</option>
                <option value="IV Year">IV Year</option>
              </select>
            </div>
  
            
            <div className="mb-4">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Department</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                <option value="Computer Science Engineering (Cyber Security)">Computer Science Engineering (Cyber Security)</option>
                <option value="Electronics Engineering (VLSI Design and Technology)">Electronics Engineering (VLSI Design and Technology)</option>
                <option value="MBA-Human Resource (HR)">MBA-Human Resource (HR)</option>
                <option value="MBA-Finance">MBA-Finance</option>
                <option value="MBA-Marketing">MBA-Marketing</option>
              </select>
            </div>
  
            
            <div className="mb-4">
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
  
          
            <div className="mb-4">
              <input
                type="text"
                name="register_number"
                placeholder="Register Number"
                value={formData.register_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>
  
          
          <div>
           
            <div className="mb-4">
              <input
                type="text"
                name="roll_no"
                placeholder="Roll Number"
                value={formData.roll_no}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
  
            
            <div className="mb-4">
              <input
                type="text"
                name="batch"
                placeholder="Batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
  
            
            <div className="mb-4">
              <input
                type="text"
                name="placement_head"
                placeholder="Placement Student Head"
                value={formData.placement_head}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
  
            
            <div className="mb-4">
              <input
                type="text"
                name="class_incharge"
                placeholder="Class Incharge"
                value={formData.class_incharge}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
  
            
            <div className="mb-4">
              <input
                type="text"
                name="staff_incharge"
                placeholder="Placement Staff Head"
                value={formData.staff_incharge}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>
  
        
        <button type="submit" className="w-full mt-6 px-4 py-2 bg-[#039ee3] text-white rounded-md">
          {isEditing ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
