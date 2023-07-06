import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main'
import CreatePost from './pages/createPost/CreatePost'
import Search from './pages/search/Search'
import CreateStory from './pages/story/CreateStory'
import Setting from './pages/setting/Setting'
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post/:postid" element={<PostDetail />} />
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
