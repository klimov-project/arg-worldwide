"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { SearchScreen } from "@/components/search-screen"
import { BottomNav } from "@/components/bottom-nav"
import type { User } from "@/components/search-screen"

type Tab = "home" | "search" | "profile"

const CURRENT_USER: User = {
  id: 0,
  name: "Владимир Круг",
  avatar: "/images/avatar-vladimir.jpg",
  rating: 5.0,
  location: "Москва",
  description:
    "Книгообмен, научная фантастика, нон-фикшн. Отдам лишнее бесплатно. Ищу редкие издания 90-х годов. Пишите!",
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-muted">
        <div
          className="relative bg-background flex flex-col overflow-hidden shadow-2xl"
          style={{ width: "100%", maxWidth: 430, height: "100dvh" }}
        >
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        </div>
      </div>
    )
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setActiveTab("profile")
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    if (tab !== "profile") {
      setSelectedUser(null)
    }
  }

  const renderScreen = () => {
    if (activeTab === "profile") {
      const displayUser = selectedUser ?? CURRENT_USER
      return (
        <ProfileScreen
          user={{
            name: displayUser.name,
            avatar: displayUser.avatar,
            rating: displayUser.rating,
            description: displayUser.description,
          }}
          showBack={!!selectedUser}
          onBack={() => {
            setSelectedUser(null)
            setActiveTab("search")
          }}
        />
      )
    }

    if (activeTab === "search") {
      return <SearchScreen onSelectUser={handleSelectUser} />
    }

    // Home tab — show current user's profile without back button
    return (
      <ProfileScreen
        user={{
          name: CURRENT_USER.name,
          avatar: CURRENT_USER.avatar,
          rating: CURRENT_USER.rating,
          description: CURRENT_USER.description,
        }}
        showBack={false}
      />
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted">
      <div
        className="relative bg-background flex flex-col overflow-hidden shadow-2xl"
        style={{ width: "100%", maxWidth: 430, height: "100dvh" }}
      >
        {/* Screen content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden flex flex-col animate-in fade-in duration-200">
            {renderScreen()}
          </div>
        </main>

        {/* Bottom navigation */}
        <BottomNav
          activeTab={activeTab === "home" || activeTab === "profile" && !selectedUser ? (activeTab === "home" ? "home" : "profile") : activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  )
}
