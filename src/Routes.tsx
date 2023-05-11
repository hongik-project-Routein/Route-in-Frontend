import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import CreatePost from './pages/createPost/CreatePost'
import Search from './pages/search/Search'
import CreateStory from './pages/story/CreateStory'
import Setting from './pages/setting/Setting'
import DiretMessage from './pages/directMessage/directMessage'
import Explore from './pages/explore/explore'
import MyProfile from './pages/profile/profile'

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
          {/* 와일드카드 문제 해결하지 않음 */}
          <Route path="/explore/*" element={<Explore />} />
          {/* 와일드카드 문제 해결하지 않음 */}
          <Route path="/profile/:username/*" element={<MyProfile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/directmessage" element={<DiretMessage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
