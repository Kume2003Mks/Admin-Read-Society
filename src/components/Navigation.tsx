import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import "../styles/navigation.css"
import { useAuth } from "../function/AuthContext";
import { useEffect, useState } from "react";
import FatchProfiles from "../function/FetchProfiles";
import { Profile } from "../function/DeclareType";

const Navigation = () => {

  const { logout, userData } = useAuth();
  const [profileData, setProfileData] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const Profiles = new FatchProfiles()
        console.log(
          'Fetching profile', userData
        )

        if (userData && userData.user.uid) {

          const ownerProfile = await Profiles.fetchProfile(userData.user.uid);
          setProfileData(ownerProfile)
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();

  }, [userData]);

  return (
    <div className="sidebar_container">
      <NavLink to="/" className="logo">
        <div>
          <img src="./RD_white.png" alt="logo" />
        </div>
      </NavLink>
      <div className="user-container">
        <img src={profileData?.profile_image}
          alt="" />
        <h3>{profileData?.userName}</h3>
      </div>
      <div className="link-container">
        <NavLink to="/" className="link">
          <p>
            <Icon icon="radix-icons:dashboard" className='icon' />
            Banner
          </p>
        </NavLink>
        <NavLink to="/books_store" className="link">
          <p>
            <Icon icon="wpf:books" className='icon' />
            Books Store
          </p>
        </NavLink>
        <NavLink to="/community" className="link">
          <p>
            <Icon icon="fluent:people-community-16-filled" className='icon' />
            Community
          </p>
        </NavLink>
        <div className="link" onClick={() => logout()}>
          <p>
            <Icon icon="ph:sign-out-fill" className='icon' />
            Logout
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navigation