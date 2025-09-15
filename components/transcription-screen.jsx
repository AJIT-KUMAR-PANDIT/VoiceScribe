"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Square, Play, Pause, Volume2, Save, Trash2 } from "lucide-react";

export function TranscriptionScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [recordingTime, setRecordingTime] = useState(0);
  const [confidence, setConfidence] = useState(0.95);

  // Mock real-time transcription
  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
        // Simulate real-time transcription
        if (Math.random() > 0.7) {
          const mockWords = [
            "नमस्ते",
            "आज",
            "मौसम",
            "बहुत",
            "अच्छा",
            "है",
            "मैं",
            "खुश",
            "हूं",
          ];
          const randomWord =
            mockWords[Math.floor(Math.random() * mockWords.length)];
          setTranscript((prev) => prev + (prev ? " " : "") + randomWord);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const languages = [
    { value: "hindi", label: "हिंदी (Hindi)", flag: "🇮🇳" },
    { value: "english", label: "English", flag: "🇺🇸" },
    { value: "tamil", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { value: "telugu", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
    { value: "bengali", label: "বাংলা (Bengali)", flag: "🇮🇳" },
    { value: "marathi", label: "मराठी (Marathi)", flag: "🇮🇳" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    setTranscript("");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSaveTranscript = () => {
    // Mock save functionality
    console.log("Saving transcript:", transcript);
  };

  const handleClearTranscript = () => {
    setTranscript("");
  };

  // CSS styles for animations
  const styles = `
    @keyframes rainbowText {
      0% { color: #ff0000; }
      16.66% { color: #ff8000; }
      33.33% { color: #ffff00; }
      50% { color: #80ff00; }
      66.66% { color: #00ff80; }
      83.33% { color: #0080ff; }
      100% { color: #8000ff; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .rainbow-text {
      animation: rainbowText 2s ease-in-out infinite;
      font-weight: 700;
      font-size: 2.5rem;
    }

    .bounce-text {
      animation: bounce 1s ease-in-out infinite;
    }

    .pulse-dot {
      animation: pulse 1.5s ease-in-out infinite;
    }

    .brain-container {
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 200px;
      height: 200px;
    }

    .brain-container:hover {
      transform: scale(1.05);
    }

    .brain-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .mic-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }
  `;

  return (
    <div className="p-6 space-y-6">
      <style>{styles}</style>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Voice Transcriber
        </h1>
        <p className="text-muted-foreground">
          Real-time speech-to-text in multiple Indian languages
        </p>
      </div>

      {/* Language Selection */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Select Language:
          </label>
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

      {/* Brain Video Section */}
      <div className="flex flex-col items-center space-y-4">
        {/* Animated "Listening..." Text - only show when recording */}
        {isRecording && !isPaused && (
          <div className="flex items-center justify-center space-x-2">
            <span className="rainbow-text bounce-text">Listening</span>
            <div className="flex space-x-1">
              <span className="pulse-dot text-3xl font-bold text-foreground">
                .
              </span>
              <span
                className="pulse-dot text-3xl font-bold text-foreground"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
              <span
                className="pulse-dot text-3xl font-bold text-foreground"
                style={{ animationDelay: "0.4s" }}
              >
                .
              </span>
            </div>
          </div>
        )}

        {/* Brain Aura Video */}
        <div
          className="brain-container"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {/* Video element for brain-aura.mp4 */}
          <video
            className="brain-video"
            src="/assets/brain-aura.mp4"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Microphone Overlay */}
          <div className="mic-overlay">
            {isRecording ? (
              <Square className="w-6 h-6 text-red-400" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </div>

          {/* Pulsing ring effect when recording */}
          {isRecording && (
            <>
              <div className="absolute -inset-2 rounded-full border-2 border-primary animate-ping opacity-75"></div>
              <div
                className="absolute -inset-4 rounded-full border-2 border-primary animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </>
          )}
        </div>
      </div>

      {/* Recording Controls */}
      <Card className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Recording Status */}
          <div className="flex items-center gap-4">
            {isRecording && (
              <Badge
                variant={isPaused ? "secondary" : "default"}
                className="animate-pulse"
              >
                {isPaused ? "PAUSED" : "RECORDING"}
              </Badge>
            )}
            <span className="text-2xl font-mono text-foreground">
              {formatTime(recordingTime)}
            </span>
            {isRecording && (
              <Badge variant="outline">
                Confidence: {Math.round(confidence * 100)}%
              </Badge>
            )}
          </div>

          {/* Secondary Controls */}
          {isRecording && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePauseResume}>
                {isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
                {isPaused ? "Resume" : "Pause"}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Live Transcript Display */}
      <Card className="glass-card p-6 border-white/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold ">Live Transcript</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveTranscript}
                disabled={!transcript}
                className="bg-white/10 border-white/30  hover:bg-white/20 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearTranscript}
                disabled={!transcript}
                className="bg-white/10 border-white/30  hover:bg-white/20 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          <div className="min-h-32 p-6 bg-white/10 rounded-lg border-2 border-dashed border-white/30 backdrop-blur-sm">
            {transcript ? (
              <p className=" leading-relaxed text-lg font-medium">
                {transcript}
                {isRecording && !isPaused && (
                  <span className="inline-block w-3 h-6 bg-white ml-2 animate-pulse rounded" />
                )}
              </p>
            ) : (
              <p className=" text-center text-lg">
                {isRecording
                  ? "Listening... Start speaking to see your words appear here."
                  : "Click the brain visualization or press the microphone to start recording."}
              </p>
            )}
          </div>

          {/* Enhanced Audio Visualization */}
          {isRecording && (
            <div className="flex items-end justify-center gap-1 h-16 bg-white/5 rounded-lg p-4">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-purple-400 to-blue-400 rounded-full animate-pulse"
                  style={{
                    width: "4px",
                    height: `${Math.random() * 48 + 8}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-14 bg-white/10 border-white/30  hover:bg-white/20 text-lg"
        >
          <Volume2 className="w-5 h-5 mr-3" />
          Play Back
        </Button>
        <Button
          variant="outline"
          className="h-14 bg-white/10 border-white/30  hover:bg-white/20 text-lg"
        >
          <Mic className="w-5 h-5 mr-3" />
          Voice Commands
        </Button>
      </div>
    </div>
  );
}
