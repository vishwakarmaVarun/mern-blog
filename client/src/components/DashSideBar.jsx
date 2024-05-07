import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      })

      const data = await res.json()
      
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              className="mb-2"
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as='div'
            >
              Profile
            </SidebarItem>
          </Link>  
            <SidebarItem icon={HiArrowSmRight} onClick={handleSignOut} className="cursor-pointer">
              Sign Out
            </SidebarItem>
          
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSideBar;
