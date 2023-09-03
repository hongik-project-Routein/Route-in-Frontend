import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/login'
import CommonLogin from './pages/commonLogin'
import CommonSignupPage from './pages/commonSignup'
import InitialSetting from './pages/InitialSetting'
import Main from './pages/Main'
import PostDetail from './pages/post/postDetail'
import WritePost from './pages/createPost/WritePost'
import CreatePostCheck from './pages/createPost/CreatePostCheck'
import Search from './pages/search/Search'
import Explore from './pages/explore/explore'
import MyProfile from './pages/profile/profile'
import Setting from './pages/setting/Setting'
import SelectPicture from './pages/createPost/SelectPicture'
import { useRecoilValue } from 'recoil'
import user from './recoil/atom/user'
import PrivateRoute from './privateRoute'

function App(): JSX.Element {
  const isLogin = useRecoilValue(user).accessToken.length !== 0

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isLogin ? '/home' : '/login'} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/common-login" element={<CommonLogin />} />
      <Route path="/common-signup" element={<CommonSignupPage />} />
      <Route path="/initial-setting" element={<InitialSetting />} />
      <Route
        path="/home"
        element={<PrivateRoute isLogin={isLogin} component={<Main />} />}
      />

      <Route element={<Layout />}>
        {/* 게시글 생성 */}
        <Route
          path="/post/:postid"
          element={
            <PrivateRoute isLogin={isLogin} component={<PostDetail />} />
          }
        />
        <Route
          path="/post/create/"
          element={
            <PrivateRoute isLogin={isLogin} component={<SelectPicture />} />
          }
        />
        <Route
          path="/post/create/text"
          element={<PrivateRoute isLogin={isLogin} component={<WritePost />} />}
        />

        <Route
          path="/post/create/setimage"
          element={
            <PrivateRoute isLogin={isLogin} component={<CreatePostCheck />} />
          }
        />
        {/* 검색 */}
        <Route
          path="/search/*"
          element={<PrivateRoute isLogin={isLogin} component={<Search />} />}
        />
        <Route
          path="/explore/*"
          element={<PrivateRoute isLogin={isLogin} component={<Explore />} />}
        />
        <Route
          path="/profile/:username/*"
          element={<PrivateRoute isLogin={isLogin} component={<MyProfile />} />}
        />
        <Route
          path="/setting"
          element={<PrivateRoute isLogin={isLogin} component={<Setting />} />}
        />
      </Route>
    </Routes>
  )
}

export default App
