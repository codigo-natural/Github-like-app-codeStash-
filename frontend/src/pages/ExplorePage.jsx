import { useState } from 'react'
import { toast } from "react-hot-toast"

import { Repos } from "../components/Repos"
import { Spinner } from "../components/Spinner"

export const ExplorePage = () => {
  const [loading, setLoading] = useState(false)
  const [repos, setRepos] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const exploreRepos = async (language) => {
    setLoading(true)
    setRepos([])
    try {
      const response = await fetch("/api/explore/repos/" + language);
      const {repos} = await response.json();

      setRepos(repos)
      console.log(repos)
      console.log(response)
      setSelectedLanguage(language)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">Explore Popular Repositories</h1>
        <div className='flex flex-wrap gap-2 my-2 justify-center'>
          <img
            onClick={() => exploreRepos('javascript')}
            src='/javascript.svg'
            alt='JavaScript Logo'
            className='h-11 sm:h-20 cursor-pointer'
          />
          <img
            onClick={() => exploreRepos('typescript')}
            src='/typescript.svg'
            alt='TypeScript Logo'
            className='h-11 sm:h-20 cursor-pointer'
          />
          <img
            onClick={() => exploreRepos('C++')}
            src='/c++.svg'
            alt='C++ Logo'
            className='h-11 sm:h-20 cursor-pointer'
          />
          <img
            onClick={() => exploreRepos('python')}
            src='/python.svg'
            alt='Python Logo'
            className='h-11 sm:h-20 cursor-pointer'
          />
          <img
            onClick={() => exploreRepos('java')}
            src='/java.svg'
            alt='Java Logo'
            className='h-11 sm:h-20 cursor-pointer'
          />
        </div>
        {repos.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full">
              {selectedLanguage.toUpperCase()}{" "}
            </span>
            Repositories
          </h2>
        )}
        {!loading && repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
        {loading && <Spinner />}
      </div>
    </div>
  )
}