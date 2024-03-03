import { createContext, useState, useEffect, useContext } from 'react'
import { toast } from "react-hot-toast"

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          credentials: "include"
        })
        const data = await response.json()
        setAuthUser(data.user)
      } catch (error) {
        toast.error(error.message)
      }
    }
    checkUserLoggedIn()
  }, [])


  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}