"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Battery, Volume2, VolumeX, Smartphone } from "lucide-react"

export function LayoutWrapper({ children }) {
  const [isOnline, setIsOnline] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [isMuted, setIsMuted] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Mock connectivity status
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1) // 90% online
      setBatteryLevel((prev) => Math.max(20, prev - Math.random() * 2))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const addNotification = (message, type = "info") => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
    }
    setNotifications((prev) => [...prev, notification])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Status Bar */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 h-8 bg-card border-b border-border z-50 items-center justify-between px-4 text-xs transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {isOnline ? <Wifi className="w-3 h-3 text-green-500" /> : <WifiOff className="w-3 h-3 text-red-500" />}
            <span className="text-muted-foreground">{isOnline ? "Online" : "Offline"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Battery className="w-3 h-3" />
            <span className="text-muted-foreground">{batteryLevel}%</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-6 px-2 transition-transform duration-200 hover:scale-105" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </Button>

          <div className="flex items-center gap-1">
            <Smartphone className="w-3 h-3" />
            <span className="text-muted-foreground">Local Processing</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-3 shadow-lg animate-in slide-in-from-right transition-transform duration-200 hover:scale-[1.01] ${
              notification.type === "error"
                ? "border-destructive"
                : notification.type === "success"
                  ? "border-green-500"
                  : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground">{notification.message}</p>
              <Badge variant="outline" className="text-xs">
                {notification.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="md:pt-8">{children}</div>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-40">
          <Card className="p-3 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You're offline. Transcription will continue using local models.
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
