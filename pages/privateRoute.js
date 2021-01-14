import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

/**
 * burası tam olmadı ben yapacam bunu ama sonra
 */

function privateRoute(children) {

  const { currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [])

  return { children }
}

export default privateRoute;