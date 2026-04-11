"use client"

import { useState, useMemo } from "react"
import Image from "next/image"

interface User {
  id: number
  name: string
  avatar: string
  location: string
  description: string
  rating: number
}

const USERS: User[] = [
  {
    id: 1,
    name: "Климов Роман",
    avatar: "/images/avatar-klimov.jpg",
    location: "Санкт-Петербург",
    description: "Книгообмен, научная фантастика, нон-фикшн.",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Аникина Анна",
    avatar: "/images/avatar-anna.jpg",
    location: "Москва",
    description: "Люблю классику и современную прозу. Обменяюсь книгами.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Сергеев Михаил",
    avatar: "/images/avatar-sergei.jpg",
    location: "Екатеринбург",
    description: "Ищу редкие издания. Готов обменяться или продать.",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Владимир Круг",
    avatar: "/images/avatar-vladimir.jpg",
    location: "Москва",
    description: "Книгообмен, научная фантастика, нон-фикшн. Отдам лишнее бесплатно.",
    rating: 5.0,
  },
]

interface SearchScreenProps {
  onSelectUser: (user: User) => void
}

export function SearchScreen({ onSelectUser }: SearchScreenProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return USERS
    return USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Search bar */}
      <div className="px-5 pt-14 pb-3 bg-background">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Поиск по пользователям"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base outline-none focus:border-primary transition-colors shadow-sm"
            aria-label="Поиск по пользователям"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-40" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p className="text-sm">Пользователи не найдены</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((user) => (
              <button
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="w-full flex items-center gap-3 bg-card rounded-2xl px-4 py-3.5 shadow-sm border border-border active:opacity-70 transition-opacity text-left"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                  <Image
                    src={user.avatar}
                    alt={`Аватар ${user.name}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{user.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground flex-shrink-0" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-xs text-muted-foreground truncate">{user.location}</span>
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export type { User }
