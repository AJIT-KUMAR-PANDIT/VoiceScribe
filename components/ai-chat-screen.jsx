"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  FileText,
  Languages,
  Lightbulb,
  MessageSquare,
  Copy,
  Volume2,
  RotateCcw,
} from "lucide-react";

export function AIChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "system",
      content:
        "Hello! I'm your AI assistant. I can help you with your transcripts - summarize them, translate to different languages, answer questions, or have a general conversation. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState("all");
  const [aiMode, setAiMode] = useState("general");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock transcript data
  const transcripts = [
    { id: "all", title: "All Transcripts (Global Context)", count: 5 },
    { id: 1, title: "Meeting Notes - Project Discussion", language: "Hindi" },
    { id: 2, title: "Voice Memo - Shopping List", language: "English" },
    { id: 3, title: "Tamil Poetry Recording", language: "Tamil" },
    { id: 4, title: "Phone Call Transcript", language: "English" },
    { id: 5, title: "Bengali Story Recording", language: "Bengali" },
  ];

  const aiModes = [
    {
      value: "general",
      label: "General Chat",
      icon: MessageSquare,
      description: "Open conversation",
    },
    {
      value: "summarize",
      label: "Summarize",
      icon: FileText,
      description: "Create summaries",
    },
    {
      value: "translate",
      label: "Translate",
      icon: Languages,
      description: "Language translation",
    },
    {
      value: "analyze",
      label: "Analyze",
      icon: Lightbulb,
      description: "Content analysis",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: "Here’s a simulated AI response 🤖",
        timestamp: new Date().toISOString(),
        mode: aiMode,
        transcript: selectedTranscript,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-border bg-card">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">AI Assistant</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Chat with AI about your transcripts
          </p>
        </div>

        {/* Controls grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Transcript selector */}
          <div>
            <label className="text-xs sm:text-sm font-medium mb-1 block">
              Transcript Context:
            </label>
            <Select
              value={selectedTranscript}
              onValueChange={setSelectedTranscript}
            >
              <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                <SelectValue placeholder="Choose transcript" />
              </SelectTrigger>
              <SelectContent>
                {transcripts.map((t) => (
                  <SelectItem key={t.id} value={t.id.toString()}>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{t.title}</span>
                      {t.count && <Badge variant="secondary">{t.count}</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mode selector */}
          <div>
            <label className="text-xs sm:text-sm font-medium mb-1 block">
              AI Mode:
            </label>
            <Select value={aiMode} onValueChange={setAiMode}>
              <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                <SelectValue placeholder="Choose mode" />
              </SelectTrigger>
              <SelectContent>
                {aiModes.map((m) => {
                  const Icon = m.icon;
                  return (
                    <SelectItem key={m.value} value={m.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{m.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 sm:gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"} transition-all duration-300`}
          >
            {/* Avatar */}
            {msg.type !== "user" && (
              <div className="flex-shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[90%] sm:max-w-[75%] md:max-w-[65%] ${msg.type === "user" ? "order-2" : ""} transition-transform duration-200 hover:scale-[1.01]`}
            >
              <Card
                className={`p-2 sm:p-3 text-sm sm:text-base ${msg.type === "user" ? "bg-primary text-primary-foreground" : msg.type === "system" ? "bg-muted text-foreground" : "bg-card"}`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </Card>
            </div>

            {msg.type === "user" && (
              <div className="flex-shrink-0 order-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <p className="text-sm text-muted-foreground">AI is typing...</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-border bg-card">
        <div className="flex gap-2 items-end">
          <Textarea
            placeholder="Ask me anything..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows={1}
            className="flex-1 resize-none text-sm sm:text-base"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="h-10 sm:h-11 px-3 sm:px-4 transition-transform duration-200 hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
