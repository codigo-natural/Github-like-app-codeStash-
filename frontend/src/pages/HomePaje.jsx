import { useCallback, useEffect, useState } from "react"

import { Search } from "../components/Search"
import { SortRepos } from "../components/SortRepos"
import { ProfileInfo } from "../components/ProfileInfo"
import { Repos } from "../components/Repos"
import { Spinner } from "../components/Spinner"

import toast from "react-hot-toast"

export const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false)

  const [sortType, setSortType] = useState("forks")

  const getUserProfileAndRepos = useCallback(async (username = "codigo-natural") => {

    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userProfile = await userResponse.json();
      setUserProfile(userProfile)

      const reposResponse = await fetch(userProfile.repos_url)
      const repos = await reposResponse.json()
      setRepos(repos)

      return { userProfile, repos }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])

  const onSearch = async (e, username) => {
    e.preventDefault()

    setLoading(true)
    setRepos([])
    setUserProfile(null)

    const { userProfile, repos } = await getUserProfileAndRepos(username)

    setUserProfile(userProfile)
    setRepos(repos)
    setLoading(false)
  }

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  )
}