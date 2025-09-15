"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Square, Play, Pause, Volume2, Save, Trash2 } from "lucide-react"

export function TranscriptionScreen() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("hindi")
  const [recordingTime, setRecordingTime] = useState(0)
  const [confidence, setConfidence] = useState(0.95)

  // Mock real-time transcription
  useEffect(() => {
    let interval
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
        // Simulate real-time transcription
        if (Math.random() > 0.7) {
          const mockWords = ["नमस्ते", "आज", "मौसम", "बहुत", "अच्छा", "है", "मैं", "खुश", "हूं"]
          const randomWord = mockWords[Math.floor(Math.random() * mockWords.length)]
          setTranscript((prev) => prev + (prev ? " " : "") + randomWord)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const languages = [
    { value: "hindi", label: "हिंदी (Hindi)", flag: "🇮🇳" },
    { value: "english", label: "English", flag: "🇺🇸" },
    { value: "tamil", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { value: "telugu", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { value: "bengali", label: "বাংলা (Bengali)", flag: "🇮🇳" },
    { value: "marathi", label: "मराठी (Marathi)", flag: "🇮🇳" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
  ]

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setRecordingTime(0)
    setTranscript("")
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    setRecordingTime(0)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  const handleSaveTranscript = () => {
    // Mock save functionality
    console.log("Saving transcript:", transcript)
  }

  const handleClearTranscript = () => {
    setTranscript("")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Voice Transcriber</h1>
        <p className="text-muted-foreground">Real-time speech-to-text in multiple Indian languages</p>
      </div>

      {/* Language Selection */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Select Language:</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Recording Controls */}
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Recording Status */}
          <div className="flex items-center gap-4">
            {isRecording && (
              <Badge variant={isPaused ? "secondary" : "default"} className="animate-pulse">
                {isPaused ? "PAUSED" : "RECORDING"}
              </Badge>
            )}
            <span className="text-2xl font-mono text-foreground">{formatTime(recordingTime)}</span>
            {isRecording && <Badge variant="outline">Confidence: {Math.round(confidence * 100)}%</Badge>}
          </div>

          {/* Main Recording Button */}
          <div className="relative">
            <Button
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isRecording
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </Button>
            {isRecording && <div className="absolute -inset-2 rounded-full border-2 border-primary animate-ping" />}
          </div>

          {/* Secondary Controls */}
          {isRecording && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePauseResume}>
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Live Transcript Display */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Live Transcript</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveTranscript} disabled={!transcript}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearTranscript} disabled={!transcript}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          <div className="min-h-32 p-4 bg-muted rounded-lg border-2 border-dashed border-border">
            {transcript ? (
              <p className="text-foreground leading-relaxed text-lg">
                {transcript}
                {isRecording && !isPaused && <span className="inline-block w-2 h-6 bg-primary ml-1 animate-pulse" />}
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                {isRecording
                  ? "Listening... Start speaking to see your words appear here."
                  : "Press the microphone button to start recording."}
              </p>
            )}
          </div>

          {/* Audio Visualization Placeholder */}
          {isRecording && (
            <div className="flex items-center justify-center gap-1 h-12">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-12 bg-transparent">
          <Volume2 className="w-4 h-4 mr-2" />
          Play Back
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          <Mic className="w-4 h-4 mr-2" />
          Voice Commands
        </Button>
      </div>
    </div>
  )
}
