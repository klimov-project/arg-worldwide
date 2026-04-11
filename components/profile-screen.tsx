"use client"

import Image from "next/image"

interface User {
  name: string
  avatar: string
  rating: number
  description: string
  location?: string
}

interface ProfileScreenProps {
  user: User
  onBack?: () => void
  showBack?: boolean
}

export function ProfileScreen({ user, onBack, showBack = false }: ProfileScreenProps) {
  const handleVerify = () => {
    alert("Верификация пользователя")
  }

  const handleContact = () => {
    alert("Написать пользователю")
  }

  const handleShare = () => {
    alert("Поделиться профилем")
  }

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(user.rating))

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-card shadow-sm border border-border active:opacity-70 transition-opacity"
            aria-label="Назад"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}

        <h1 className="text-base font-semibold text-foreground">Профиль пользователя</h1>

        <button
          onClick={handleShare}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-card shadow-sm border border-border active:opacity-70 transition-opacity"
          aria-label="Поделиться"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>

      {/* Profile content */}
      <div className="flex flex-col items-center px-6 flex-1 overflow-y-auto">
        {/* Avatar */}
        <div className="relative mt-4 mb-5">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-white">
            <Image
              src={user.avatar}
              alt={`Аватар ${user.name}`}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-foreground mb-2 text-center">
          {user.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-5">
          <span className="text-base font-semibold text-foreground">{user.rating.toFixed(1)}</span>
          <div className="flex items-center gap-0.5" role="img" aria-label={`Рейтинг ${user.rating} из 5 звёзд`}>
            {stars.map((filled, i) => (
              <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={filled ? "#FFCC00" : "#E5E7EB"}
                aria-hidden="true"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
        </div>

        {/* Description card */}
        <div className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border mb-6">
          <p className="text-sm text-foreground leading-relaxed">
            {user.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-3 pb-6">
          <button
            onClick={handleVerify}
            className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-semibold text-base active:opacity-80 transition-opacity shadow-sm border-2 border-white text-white"
            style={{ backgroundColor: "#2DA44E" }}
          >
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2DA44E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            Верифицировать
          </button>

          <button
            onClick={handleContact}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:opacity-80 transition-opacity shadow-sm"
          >
            Написать
          </button>
        </div>
      </div>
    </div>
  )
}
