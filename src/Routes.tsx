import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import CreatePost from './pages/createPost/CreatePost'
import Search from './pages/search/Search'
import CreateStory from './pages/story/CreateStory'
import LocationExplore from './pages/explore/locationExplore'
import MyProfile from './pages/profile/MyProfile'
import Setting from './pages/setting/Setting'

function Router(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/search" element={<Search />} />
          <Route path="/story/create" element={<CreateStory />} />
          <Route path="/explore" element={<LocationExplore />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
