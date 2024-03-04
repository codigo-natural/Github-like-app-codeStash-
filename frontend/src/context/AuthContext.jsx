import { createContext, useState, useEffect, useContext } from 'react'
import { toast } from "react-hot-toast"

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
    const [loading, setLoading] = useState(true)
      setLoading(true)
      try {
        const response = await fetch("/api/auth/check", {
          credentials: "include"
        })
        const data = await response.json()
        setAuthUser(data.user)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    checkUserLoggedIn()
  }, [])


  return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
    {children}
  </AuthContext.Provider>
}