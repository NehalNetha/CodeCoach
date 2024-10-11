"use client"
import { Menu, LogOut, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import ProblemProvider from './ProblemContext';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authStatusLoggedIn, setAuthStatusLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  }

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        setAuthStatusLoggedIn(false);
        setUser(null);
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  useEffect(() => {
    const fetchingStatus = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/auth/status", {
          method: "GET",
          credentials: "include"
        })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { isAuthenticated, user } = await response.json()
        console.log(isAuthenticated, user)
        setAuthStatusLoggedIn(isAuthenticated)
        
        if (isAuthenticated) {
          await FetchingUser();
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setAuthStatusLoggedIn(false)
      } finally {
        setIsLoading(false);
      }
    }

    const FetchingUser = async () => {
      try {
        const result = await fetch("http://localhost:3003/api/auth/details", {
          method: "GET",
          credentials: "include"
        })
        if (!result.ok) {
          throw new Error("failed to fetch user details")
        }
        const User = await result.json()
        setUser(User)
        console.log("user: ", User)

      } catch (error) {
        console.log("failed to fetch user details")
      }
    }

    fetchingStatus()
    console.log("auth: ", authStatusLoggedIn)
  }, [])

  return (
    <>
      <nav className="mx-8 mb-8 p-4 border-gray-400 border-b-[1px] border-x-[1px] rounded-b-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-3">
              <button onClick={toggleIsOpen}>
                <Menu />
              </button>
              <Link href="/">
                <h1>CodeCoach</h1>
              </Link>
            </div>

            {isLoading ? (
              <div className="w-[2.3rem] h-[2.3rem] rounded-3xl flex items-center justify-center bg-gray-200">
                <Loader2 className="animate-spin" size={20} />
              </div>
            ) : !authStatusLoggedIn ? (
              <div className="flex gap-7">
                <a href="#" className="text-black font-light pt-1 rounded-md"
                  onClick={() => window.location.href = "http://localhost:3003/login/federated/google"}
                >Sign In</a>
                <a href="#" className="bg-purple-500 px-6 py-1 rounded-lg text-white font-normal">Sign Up</a>
              </div>
            ) : (
              <div className="relative pt-[8px]">
                <button 
                  className='w-[2.3rem] h-[2.3rem] rounded-3xl'
                  onClick={toggleDropdown}
                >
                  {user && user.profileImage ? (
                    <img src={user.profileImage} className='rounded-3xl' alt="Profile" />
                  ) : (
                    <div className='w-full h-full bg-gray-300 rounded-3xl'></div> // Placeholder
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="inline-block mr-2" size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <ProblemProvider>
        <Sidebar isOpen={isOpen} close={toggleIsOpen} />
      </ProblemProvider>
    </>
  )
}

export default Navbar