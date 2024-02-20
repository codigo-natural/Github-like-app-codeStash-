import { useCallback, useEffect, useState } from "react"

import { Search } from "../components/Search"
import { SortRepos } from "../components/SortRepos"
import { ProfileInfo } from "../components/ProfileInfo"
import { Repos } from "../components/Repos"

import toast from "react-hot-toast"

export const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false)

  const [sortType, setSortType] = useState("forks")

  const getUserProfileAndRepos = useCallback(async () => {

    try {
      const userResponse = await fetch("https://api.github.com/users/codigo-natural");
      const userProfile = await userResponse.json();
      setUserProfile(userProfile)

      const reposResponse = await fetch(userProfile.repos_url)
      const repos = await reposResponse.json()
      setRepos(repos)
      console.log("userProfile", userProfile)
      console.log("userRepos", repos)

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])

  return (
    <div className="m-4">
      <Search />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        <ProfileInfo userProfile={userProfile} />
        <Repos />
      </div>
    </div>
  )
}