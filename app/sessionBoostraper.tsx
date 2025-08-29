// app/SessionBootstrapper.tsx
'use client'

import { useSupabaseAuthSync } from '@/hooks/useSupabaseAutoSync'
import { restoreSession } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const SessionBootstrapper = () => {
  const dispatch = useDispatch<AppDispatch>()
  useSupabaseAuthSync()

  useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  return null
}
