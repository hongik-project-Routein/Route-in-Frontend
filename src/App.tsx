import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './components/auth/login'
import InitialSetting from './components/auth/InitialSetting'
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
import DummyPost from './pages/dev/dummyPost'
import LoginLayout from './components/layout/LoginLayout'
import CommonSignin from './components/auth/commonSignin'
import CommonSignup from './components/auth/commonSignup'

function App(): JSX.Element {
  const isLogin = useRecoilValue(user).accessToken !== ''

  const loginCheck = (): JSX.Element => {
    return isLogin ? (
      <PrivateRoute isLogin={isLogin} component={<Main />} />
    ) : (
      <Navigate to={'/login'} />
    )
  }

  return (
    <Routes>
      <Route path="/" element={loginCheck()} />

      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/common-login" element={<CommonSignin />} />
        <Route path="/common-signup" element={<CommonSignup />} />
        <Route path="/initial-setting" element={<InitialSetting />} />
      </Route>

      <Route element={<Layout />}>
        {/* 더미 데이터 생성 */}
        <Route
          path="/post/dummycreate"
          element={<PrivateRoute isLogin={isLogin} component={<DummyPost />} />}
        />
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
          path="/profile/:uname/*"
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
