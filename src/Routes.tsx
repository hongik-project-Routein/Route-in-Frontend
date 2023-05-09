import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import CreatePost from './pages/createPost/CreatePost'
import Search from './pages/search/Search'
import CreateStory from './pages/story/CreateStory'
import LocationExplore from './pages/explore/locationExplore'
import MyProfile from './pages/profile/MyProfile'
import Setting from './pages/setting/Setting'
import DiretMessage from './pages/directMessage/directMessage'

function Router(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post/create" element={<CreatePost />} />
          {/* 와일드카드 문제 해결하지 않음 */}
          <Route path="/search/*" element={<Search />} />
          <Route path="/story/create" element={<CreateStory />} />
          <Route path="/explore" element={<LocationExplore />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/directmessage" element={<DiretMessage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
