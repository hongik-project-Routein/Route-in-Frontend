import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main'
import CreatePost from './pages/createPost/CreatePost'
import Search from './pages/search/Search'
import Setting from './pages/setting/Setting'
import Explore from './pages/explore/explore'
import MyProfile from './pages/profile/profile'
import PostDetail from './pages/post/postDetail'
import WritePost from './pages/createPost/WritePost'
import SelectRepresentativePicture from './pages/createPost/SelectRepresentativePicture'
import HeaderAndSidebar from './components/common/headerAndSidebar'
import Login from './pages/login'
import InitialSetting from './pages/InitialSetting'
import CommonLogin from './pages/commonLogin'
import CommonSignupPage from './pages/commonSignup'

function Router(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/common-login" element={<CommonLogin />} />
          <Route path="/common-signup" element={<CommonSignupPage />} />
          <Route path="/initial-setting" element={<InitialSetting />} />
          <Route path="/home" element={<Main />} />
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
          <Route path="/explore/*" element={<Explore />} />
          <Route path="/profile/:username/*" element={<MyProfile />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
