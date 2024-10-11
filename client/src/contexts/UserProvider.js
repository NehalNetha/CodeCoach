"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

export const UserContext = createContext(undefined);

export const useUser = () => useContext(UserContext)

function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
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
      } catch (error) {
        console.log("failed to fetch user details")
      }
    }

    FetchingUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider