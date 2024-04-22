'use client'
import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  // TODO: type of user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  isAuthenticated: boolean
  token: string
  login: (email: string, password: string) => Promise<number>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null)
  const [tokenState, setTokenState] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getCookie('token')

      if (token) {
        setTokenState(token)
        const res = await fetch('http://127.0.0.1:8080/api/v1/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.ok) {
          const user = await res.json()
          setUser(user)
        } else {
          logout()
        }
      }
    }
    loadUserFromCookies()
    /* eslint-disable */
  }, [setTokenState])

  const login = async (email: string, password: string) => {
    const res = await fetch('http://127.0.0.1:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      const data = await res.json()
      const oneDay = 1000 * 60 * 60 * 24

      setCookie('token', data.token, {
        expires: new Date(Date.now() + oneDay),
      })

      setTokenState(data.token)

      const user = await fetch('http://127.0.0.1:8080/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }).then((res) => res.json())

      setUser(user)
    }

    return res.status
  }

  const logout = () => {
    deleteCookie('token')
    setUser(null)

    setTokenState('')

    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        token: tokenState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
