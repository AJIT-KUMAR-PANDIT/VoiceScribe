"use client";

import { useState } from "react";
import { TranscriptionScreen } from "@/components/transcription-screen";
import { HistoryScreen } from "@/components/history-screen";
import { AIChatScreen } from "@/components/ai-chat-screen";
import { SettingsScreen } from "@/components/settings-screen";
import { Navigation } from "@/components/navigation";

export default function TranscriptionApp() {
  const [activeScreen, setActiveScreen] = useState("transcription");

  const renderScreen = () => {
    switch (activeScreen) {
      case "transcription":
        return <TranscriptionScreen />;
      case "history":
        return <HistoryScreen />;
      case "ai-chat":
        return <AIChatScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <TranscriptionScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="md:pl-64">
        <div className="max-w-4xl mx-auto">{renderScreen()}</div>
      </div>
      <div className="flex justify-center py-4">&copy; AJIT KUMAR PANDIT</div>
      <div className="h-11 mb-1"></div>
      <Navigation
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
      />
    </div>
  );
}
