"use client"

import { useState } from "react"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const handleSocialLogin = (provider: string) => {
    alert(`Вход через ${provider}`)
  }

  const handleContinue = () => {
    onLogin()
  }

  return (
    <div className="flex flex-col h-full bg-background px-6 pt-14 pb-8">
      {/* Header */}
      <h1 className="text-center text-base font-semibold text-foreground tracking-wide mb-8">
        Авторизация
      </h1>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #FFCC00 0%, #FFB800 100%)" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path
              d="M8 8 L20 32 L32 8 L26 8 L20 22 L14 8 Z"
              fill="white"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Войти
      </h2>

      {/* Social login buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => handleSocialLogin("Telegram")}
          className="w-full h-14 rounded-2xl bg-card border border-border flex items-center justify-center gap-3 text-foreground font-medium text-base shadow-sm active:opacity-80 transition-opacity"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
              fill="#26A5E4"
            />
            <path
              d="M17.64 8.27l-1.72 8.1c-.13.58-.47.72-.95.45l-2.62-1.93-1.27 1.22c-.14.14-.26.26-.53.26l.19-2.68 4.89-4.42c.21-.19-.05-.29-.33-.1l-6.05 3.81-2.6-.82c-.57-.18-.58-.57.12-.84l10.14-3.91c.47-.17.89.12.73.86z"
              fill="white"
            />
          </svg>
          Telegram
        </button>

        <button
          onClick={() => handleSocialLogin("Google")}
          className="w-full h-14 rounded-2xl bg-card border border-border flex items-center justify-center gap-3 text-foreground font-medium text-base shadow-sm active:opacity-80 transition-opacity"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
      </div>

      {/* Separator */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">или</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Input fields */}
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex flex-col">
          <label htmlFor="login-input" className="sr-only">Логин</label>
          <input
            id="login-input"
            type="text"
            placeholder="Введите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full bg-transparent border-b-2 border-border py-3 text-foreground placeholder:text-muted-foreground text-base outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="password-input" className="sr-only">Пароль</label>
          <input
            id="password-input"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b-2 border-border py-3 text-foreground placeholder:text-muted-foreground text-base outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:opacity-80 transition-opacity shadow-sm mt-auto"
      >
        Продолжить
      </button>
    </div>
  )
}
