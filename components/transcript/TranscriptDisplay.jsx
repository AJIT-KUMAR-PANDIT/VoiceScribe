"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Save, 
  Trash2, 
  Copy, 
  Download, 
  Share2, 
  Edit3, 
  Volume2,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"

export function TranscriptDisplay({ 
  transcript = "",
  isRecording = false,
  isPaused = false,
  language = "english",
  onSave,
  onClear,
  onEdit,
  className,
  variant = "default" // default, compact, fullscreen
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const textRef = useRef(null)

  useEffect(() => {
    if (transcript) {
      setWordCount(transcript.trim().split(/\s+/).length)
    } else {
      setWordCount(0)
    }
  }, [transcript])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transcript)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleExport = (format) => {
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `transcript-${timestamp}.${format}`
    
    // Mock export functionality
    console.log(`Exporting as ${filename}`)
  }

  const handleTextToSpeech = () => {
    // Mock TTS functionality
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(transcript)
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  if (variant === "compact") {
    return (
      <div className={cn(
        "p-3 rounded-lg",
        "glass backdrop-blur-md",
        "border border-primary/20",
        className
      )}>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {wordCount} words
          </Badge>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleCopy}>
              <Copy className="h-3 w-3" />
            </Button>
            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onClear}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="text-sm max-h-32 overflow-y-auto">
          {transcript || <span className="text-muted-foreground">No transcript yet...</span>}
        </div>
      </div>
    )
  }

  return (
    <Card className={cn(
      "relative overflow-hidden",
      "glass-dark backdrop-blur-lg",
      "border-2 border-primary/20",
      "transform-gpu transition-all duration-500",
      "hover:shadow-2xl hover:shadow-primary/10",
      variant === "fullscreen" && "fixed inset-4 z-50",
      className
    )}>
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-50" />
      
      {/* Header */}
      <div className="relative p-4 sm:p-6 border-b border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 hidden sm:block">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                Live Transcript
                {isRecording && !isPaused && (
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs text-primary animate-pulse">AI Enhanced</span>
                  </div>
                )}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {wordCount} words
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {Math.ceil(wordCount / 200)} min read
                </Badge>
                {transcript && (
                  <Badge variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!transcript}
              className={cn(
                "glass backdrop-blur-md border-primary/30",
                "hover:bg-primary/10 hover:scale-105",
                "transition-all duration-200"
              )}
            >
              {isCopied ? (
                <>✓ Copied</>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={!transcript}
              className={cn(
                "glass backdrop-blur-md border-primary/30",
                "hover:bg-primary/10 hover:scale-105",
                "transition-all duration-200"
              )}
            >
              <Save className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleTextToSpeech}
              disabled={!transcript}
              className={cn(
                "glass backdrop-blur-md border-primary/30",
                "hover:bg-primary/10 hover:scale-105",
                "transition-all duration-200"
              )}
            >
              <Volume2 className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Speak</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              disabled={!transcript}
              className={cn(
                "glass backdrop-blur-md border-destructive/30",
                "hover:bg-destructive/10 hover:scale-105",
                "transition-all duration-200",
                "text-destructive hover:text-destructive"
              )}
            >
              <Trash2 className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Transcript Content */}
      <div className="relative p-4 sm:p-6">
        <div 
          ref={textRef}
          className={cn(
            "relative min-h-[150px] sm:min-h-[200px] lg:min-h-[250px]",
            "max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]",
            "overflow-y-auto",
            "p-4 sm:p-6",
            "rounded-lg",
            "bg-gradient-to-br from-background/50 to-muted/30",
            "border-2 border-dashed",
            transcript ? "border-primary/30" : "border-border/50",
            "transition-all duration-300",
            "scroll-smooth",
            isExpanded && "max-h-none"
          )}
          contentEditable={false}
          onMouseUp={() => {
            const selection = window.getSelection()
            setSelectedText(selection.toString())
          }}
        >
          {transcript ? (
            <div className="space-y-2">
              <p className={cn(
                "text-sm sm:text-base lg:text-lg",
                "leading-relaxed sm:leading-relaxed lg:leading-loose",
                "text-foreground",
                "whitespace-pre-wrap",
                "selection:bg-primary/20 selection:text-primary-foreground"
              )}>
                {transcript}
                {isRecording && !isPaused && (
                  <span className="inline-block w-0.5 h-5 sm:h-6 bg-primary ml-1 animate-pulse" />
                )}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-primary/50" />
              </div>
              <div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {isRecording
                    ? "Listening... Start speaking to see your words appear here."
                    : "Your transcript will appear here once you start recording."}
                </p>
                {!isRecording && (
                  <p className="text-xs sm:text-sm text-muted-foreground/70 mt-2">
                    Press the microphone button to begin
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Expand/Collapse Button */}
        {transcript && transcript.length > 500 && (
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs hover:bg-primary/10"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Show More
                </>
              )}
            </Button>
          </div>
        )}

        {/* Selected Text Actions */}
        {selectedText && (
          <div className={cn(
            "absolute top-2 right-2",
            "p-2 rounded-lg",
            "glass backdrop-blur-lg",
            "border border-primary/30",
            "shadow-lg",
            "animate-slide-in-3d",
            "z-10"
          )}>
            <div className="flex gap-1">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={() => navigator.clipboard.writeText(selectedText)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(selectedText)
                  speechSynthesis.speak(utterance)
                }}
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={() => console.log('Translate:', selectedText)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Export Options */}
      {transcript && (
        <div className="relative p-4 sm:p-6 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Export options:
            </span>
            <div className="flex flex-wrap gap-2">
              {['txt', 'pdf', 'docx', 'srt'].map((format) => (
                <Button
                  key={format}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExport(format)}
                  className="text-xs hover:bg-primary/10"
                >
                  <Download className="w-3 h-3 mr-1" />
                  {format.toUpperCase()}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs hover:bg-primary/10"
              >
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}