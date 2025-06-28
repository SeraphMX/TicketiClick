// app/SessionBootstrapper.tsx
'use client'

import { restoreSession } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const SessionBootstrapper = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  return null
}
