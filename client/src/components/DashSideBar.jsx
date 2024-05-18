import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state.user)

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
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dashboard">
            <SidebarItem
              className="mb-2"
              active={tab === "dashboard" || !tab}
              icon={HiChartPie}
              as='div'
            >
              DashBoard
            </SidebarItem>
          </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <SidebarItem
              className="mb-2"
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as='div'
            >
              Profile
            </SidebarItem>
          </Link>
          {/* if the currentUser's isAmin is true then we show this element to the admin post page */}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <SidebarItem
                className="mb-2"
                active={tab === "posts"}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <SidebarItem
                className="mb-2"
                active={tab === "comments"}
                icon={HiAnnotation}
                as='div'
              >
                Comments
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <SidebarItem
                className="mb-2"
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Users
              </SidebarItem>
            </Link>
          )}
          <SidebarItem icon={HiArrowSmRight} onClick={handleSignOut} className="cursor-pointer">
            Sign Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};

export default DashSideBar;
