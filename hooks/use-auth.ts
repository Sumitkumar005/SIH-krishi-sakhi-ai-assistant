"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  phone: string
  location: string
  crops: string[]
  farmSize: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock authentication check
    const authToken = localStorage.getItem("krishi-auth-token")
    const userData = localStorage.getItem("krishi-user-data")

    if (authToken && userData) {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("krishi-auth-token", "mock-token-123")
    localStorage.setItem("krishi-user-data", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("krishi-auth-token")
    localStorage.removeItem("krishi-user-data")
    setUser(null)
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  }
}
