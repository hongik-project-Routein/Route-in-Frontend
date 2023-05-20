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
import PostDetail from './pages/post/postDetail'
import WritePost from './pages/createPost/WritePost'
import SelectRepresentativePicture from './pages/createPost/SelectRepresentativePicture'
import HeaderAndSidebar from './components/headerAndSidebar'
import Login from './pages/login'
import SignUp from './pages/signUp'
import Story from './pages/story/Story'

function Router(): JSX.Element {
  return (
    <>
      {/* 전체적으로 와일드카드 문제 해결하지 않음 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post/:postid" element={<PostDetail />} />
          {/* post/create 나중에 수정하기 */}
          <Route path="/post/create/" element={<CreatePost />} />
          <Route
            path="/post/create/text"
            element={<HeaderAndSidebar article={<WritePost />} />}
          />
          <Route
            path="/post/create/setimage"
            element={
              <HeaderAndSidebar article={<SelectRepresentativePicture />} />
            }
          />
          <Route path="/search/*" element={<Search />} />
          <Route path="/story" element={<Story />} />
          <Route path="/story/create" element={<CreateStory />} />
          <Route path="/explore/*" element={<Explore />} />
          <Route path="/profile/:username/*" element={<MyProfile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/directmessage" element={<DiretMessage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
