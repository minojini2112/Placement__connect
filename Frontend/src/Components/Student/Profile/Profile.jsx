
import React, { useState, useEffect } from 'react';
import DisplayProfile from './DisplayProfile';
import EditProfile from './EditProfile';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const userId = 1;

  useEffect(() => {
    setLoading(true);
    const fetchProfileData = async () => {
      try {
        const endpoint = isEditing ? 'getprofile' : 'profile';
        const response = await fetch(`https://placement-connect.onrender.com/${endpoint}/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.data) {
          setProfileData(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('An error occurred while fetching profile data!');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [userId, isEditing]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {isEditing ? (
        <EditProfile
          userId={userId}
          profileData={profileData}
          setProfileData={setProfileData}
          setIsEditing={setIsEditing}
        />
      ) : (
        <DisplayProfile profileData={profileData} setIsEditing={setIsEditing} />
      )}
    </>
  );
};

export default Profile;
