// LogoutBtn.jsx
import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className="ml-4 px-5 py-2.5  hover:bg-gray-600 text-gray-200 font-medium rounded-xl transition-colors text-lg"
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn