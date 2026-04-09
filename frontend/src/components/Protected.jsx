import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore';
const Protected = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to="/signin" />
}

export default Protected