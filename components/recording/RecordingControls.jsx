"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mic, Square, Play, Pause, RotateCcw, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AudioVisualizerMini } from "@/components/audio/AudioVisualizer3D";

export function RecordingControls({
  onStart,
  onStop,
  onPause,
  onResume,
  isRecording = false,
  isPaused = false,
  recordingTime = 0,
  confidence = 0,
  className,
}) {
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    setPulseAnimation(isRecording && !isPaused);
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card
      className={cn(
        "p-4 sm:p-6 lg:p-8",
        "glass-dark backdrop-blur-lg",
        "border-2 border-primary/20",
        "transform-gpu transition-all duration-500",
        "hover:shadow-2xl hover:shadow-primary/20",
        className
      )}
    >
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        {/* Status Display */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {isRecording && (
            <>
              <Badge
                variant={isPaused ? "secondary" : "default"}
                className={cn(
                  "text-xs sm:text-sm px-2 sm:px-3 py-1",
                  !isPaused &&
                    "animate-pulse bg-gradient-to-r from-red-500 to-red-600"
                )}
              >
                {isPaused ? "PAUSED" : "RECORDING"}
              </Badge>

              <div className="flex items-center gap-2">
                <AudioVisualizerMini isActive={isRecording && !isPaused} />
              </div>
            </>
          )}

          <span
            className={cn(
              "text-xl sm:text-2xl lg:text-3xl font-mono font-bold",
              "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            )}
          >
            {formatTime(recordingTime)}
          </span>

          {isRecording && confidence > 0 && (
            <Badge
              variant="outline"
              className="text-xs sm:text-sm border-primary/50"
            >
              <span className="hidden sm:inline">Confidence: </span>
              {Math.round(confidence * 100)}%
            </Badge>
          )}
        </div>

        {/* Main Recording Button - 3D Effect */}
        <div className="relative">
          <div
            className={cn(
              "relative transform-gpu transition-all duration-300",
              "hover:scale-105 active:scale-95"
            )}
          >
            <Button
              size="lg"
              className={cn(
                "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full",
                "btn-3d shadow-2xl",
                "relative overflow-hidden",
                "before:absolute before:inset-0 before:rounded-full",
                isRecording
                  ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  : "bg-gradient-to-br from-primary via-secondary to-accent hover:shadow-glow"
              )}
              onClick={isRecording ? onStop : onStart}
            >
              <span className="relative z-10">
                {isRecording ? (
                  <Square className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                ) : (
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                )}
              </span>

              {/* Animated gradient overlay */}
              {!isRecording && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
              )}
            </Button>

            {/* Pulse rings */}
            {pulseAnimation && (
              <>
                <div className="absolute -inset-2 sm:-inset-3 rounded-full border-2 border-red-500 animate-ping" />
                <div className="absolute -inset-4 sm:-inset-5 rounded-full border border-red-400 animate-ping animation-delay-200" />
                <div className="absolute -inset-6 sm:-inset-7 rounded-full border border-red-300 animate-ping animation-delay-400" />
              </>
            )}
          </div>
        </div>

        {/* Secondary Controls */}
        {isRecording && (
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "glass backdrop-blur-md border-primary/30",
                "hover:bg-primary/10 hover:scale-105",
                "transition-all duration-200"
              )}
              onClick={isPaused ? onResume : onPause}
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "glass backdrop-blur-md border-primary/30",
                "hover:bg-primary/10 hover:scale-105",
                "transition-all duration-200"
              )}
              onClick={() => console.log("Reset")}
            >
              <RotateCcw className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        )}

        {/* Quick Settings */}
        {!isRecording && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Settings2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Press spacebar to start/stop</span>
          </div>
        )}
      </div>
    </Card>
  );
}

// Compact version for mobile
export function RecordingControlsMini({
  onToggle,
  isRecording = false,
  isPaused = false,
  className,
}) {
  return (
    <div
      className={cn(
        "fixed bottom-20 right-4 z-50",
        "transform-gpu transition-all duration-300",
        className
      )}
    >
      <Button
        size="lg"
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl",
          "btn-3d",
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-primary/90"
        )}
        onClick={onToggle}
      >
        {isRecording ? (
          <Square className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>

      {isRecording && !isPaused && (
        <div className="absolute -inset-1 rounded-full border-2 border-red-500 animate-ping" />
      )}
    </div>
  );
}
