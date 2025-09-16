"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, History, MessageSquare, Settings, Plus, Search } from "lucide-react"

export function Navigation({ activeScreen, onScreenChange }) {
  // Mock data for badges
  const getScreenBadge = (screenId) => {
    switch (screenId) {
      case "history":
        return 127 // Total transcripts
      case "ai-chat":
        return 3 // Unread AI responses
      default:
        return null
    }
  }

  const navItems = [
    {
      id: "transcription",
      label: "Record",
      icon: Mic,
      description: "Start new recording",
    },
    {
      id: "history",
      label: "History",
      icon: History,
      description: "View saved transcripts",
    },
    {
      id: "ai-chat",
      label: "AI Chat",
      icon: MessageSquare,
      description: "Chat with AI assistant",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "Configure app settings",
    },
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 md:hidden transition-all duration-300 ease-in-out">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeScreen === item.id
              const badge = getScreenBadge(item.id)

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="flex flex-col gap-1 h-auto py-2 px-3 relative transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                  onClick={() => onScreenChange(item.id)}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {badge && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                      >
                        {badge > 99 ? "99+" : badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs">{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 flex-col transition-all duration-300 ease-in-out">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">VoiceScribe</h1>
              <p className="text-xs text-muted-foreground">AI Transcription</p>
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeScreen === item.id
              const badge = getScreenBadge(item.id)

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start h-12 px-4 relative transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                  onClick={() => onScreenChange(item.id)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  {badge && (
                    <Badge variant="secondary" className="text-xs">
                      {badge > 99 ? "99+" : badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-auto p-6 space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Quick Record
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search Transcripts
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="p-6 border-t border-border transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">Ready to transcribe</span>
          </div>
        </div>
      </nav>
    </>
  )
}
