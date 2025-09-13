"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] AuthGuard: Checking authentication...")

    const authToken = localStorage.getItem("krishi-auth-token")
    console.log("[v0] AuthGuard: Token found:", !!authToken)

    if (!authToken) {
      console.log("[v0] AuthGuard: No token, redirecting to auth...")
      router.push("/auth")
    } else {
      console.log("[v0] AuthGuard: Token valid, showing dashboard...")
      setIsAuthenticated(true)
    }
  }, [router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-2xl">
            <span className="text-white text-2xl font-bold">K</span>
          </div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
