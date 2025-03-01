
import { Login } from '../pages/Auth'

import { Home } from '../pages/Dashboard'
import { Profile } from '../pages/User'

import { NotFound } from '../pages/Error'

import { Details } from '../pages/Surveys'

const publicRoutes = [
  { path: '/login', component: <Login /> },
  { path: '/404', component: <NotFound /> },
]

const privateRoutes = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/user/profile', component: <Profile /> },
  { path: '/survey/detail/:id/:name', component: <Details /> },
]

export { publicRoutes, privateRoutes }
