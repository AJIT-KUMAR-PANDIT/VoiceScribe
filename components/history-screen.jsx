"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportModal } from "@/components/export-modal";
import {
  Search,
  Filter,
  Download,
  Trash2,
  Play,
  MessageSquare,
  Calendar,
  Clock,
  Mic,
  FileText,
  Star,
  StarOff,
} from "lucide-react";

export function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTranscripts, setSelectedTranscripts] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock transcript data
  const [transcripts] = useState([
    {
      id: 1,
      title: "Meeting Notes - Project Discussion",
      content:
        "आज हमने प्रोजेक्ट के बारे में बात की। यह एक महत्वपूर्ण मीटिंग थी जिसमें हमने भविष्य की योजनाओं पर चर्चा की।",
      language: "Hindi",
      duration: "5:23",
      date: "2024-01-15",
      time: "14:30",
      confidence: 0.94,
      isFavorite: true,
      hasAIInteraction: true,
      wordCount: 45,
    },
    {
      id: 2,
      title: "Voice Memo - Shopping List",
      content:
        "I need to buy groceries today. Milk, bread, eggs, and some vegetables for dinner.",
      language: "English",
      duration: "1:12",
      date: "2024-01-14",
      time: "09:15",
      confidence: 0.98,
      isFavorite: false,
      hasAIInteraction: false,
      wordCount: 16,
    },
  ]);

  const filteredTranscripts = transcripts
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "favorites" && t.isFavorite) ||
        (filterBy === "ai-interactions" && t.hasAIInteraction) ||
        filterBy === t.language.toLowerCase();

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return +new Date(b.date) - +new Date(a.date);
      if (sortBy === "oldest") return +new Date(a.date) - +new Date(b.date);
      if (sortBy === "confidence") return b.confidence - a.confidence;
      return 0;
    });

  const handleExportTranscript = (t) => {
    setSelectedTranscripts([t.id]);
    setShowExportModal(true);
  };

  const handleExportAll = () => {
    setSelectedTranscripts([]);
    setShowExportModal(true);
  };

  const handleSelectTranscript = (id) => {
    setSelectedTranscripts((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleToggleFavorite = (id) => {
    console.log("Toggle fav:", id);
  };

  const handleAIInteraction = (t) => {
    console.log("AI Chat with:", t.title);
  };

  const getLanguageFlag = (lang) => {
    const flags = { Hindi: "🇮🇳", English: "🇺🇸", Tamil: "🇮🇳", Bengali: "🇮🇳" };
    return flags[lang] || "🌐";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 pb-24 transition-colors duration-300">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Transcript History</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Manage and review your saved transcriptions
        </p>
      </div>

      {/* Search + Filters */}
      <Card className="p-4 space-y-4 transition-transform duration-200 hover:scale-[1.01]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transcripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={filterBy} onValueChange={setFilterBy} className="transition-transform duration-200 hover:scale-[1.01]">
                <SelectTrigger className="w-36 sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
                <SelectItem value="ai-interactions">AI Interactions</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-28 sm:w-32 transition-transform duration-200 hover:scale-[1.01]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="confidence">Confidence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats + Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap gap-2 text-muted-foreground">
            <span>{filteredTranscripts.length} transcripts</span>
            <span>•</span>
            <span>
              {transcripts.filter((t) => t.isFavorite).length} favorites
            </span>
            <span>•</span>
            <span>
              {transcripts.filter((t) => t.hasAIInteraction).length} AI chats
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTranscripts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportModal(true)}
                className="w-full sm:w-auto transition-transform duration-200 hover:scale-[1.01]"
              >
                <Download className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">
                  Export Selected ({selectedTranscripts.length})
                </span>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleExportAll} className="transition-transform duration-200 hover:scale-105">
              <Download className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Export All</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Transcript List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTranscripts.length === 0 ? (
          <Card className="p-8 text-center col-span-full transition-transform duration-200 hover:scale-[1.01]">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No transcripts found</h3>
            <p className="text-muted-foreground text-sm">
              {searchQuery || filterBy !== "all"
                ? "Try changing your search or filter."
                : "Start recording to create your first transcript."}
            </p>
          </Card>
        ) : (
          filteredTranscripts.map((t) => (
            <Card key={t.id} className="p-4 hover:shadow-lg transition-shadow transition-transform duration-200 hover:scale-[1.01]">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedTranscripts.includes(t.id)}
                    onChange={() => handleSelectTranscript(t.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold">{t.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getLanguageFlag(t.language)} {t.language}
                      </Badge>
                      {t.hasAIInteraction && (
                        <Badge variant="secondary" className="text-xs">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {t.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {t.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mic className="w-3 h-3" /> {t.duration}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(t.confidence * 100)}% conf
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleFavorite(t.id)}
                  className="transition-transform duration-200 hover:scale-105"
                >
                  {t.isFavorite ? (
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Content */}
              <div className="bg-muted p-2 sm:p-3 rounded-lg mt-2">
                <p className="text-sm line-clamp-2">{t.content}</p>
                <div className="mt-1 text-xs text-muted-foreground">
                  {t.wordCount} words
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-3 flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex-1 transition-transform duration-200 hover:scale-105">
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleAIInteraction(t)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    AI Chat
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 transition-transform duration-200 hover:scale-105"
                    onClick={() => handleExportTranscript(t)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 transition-transform duration-200 hover:scale-105">
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        transcripts={transcripts}
        selectedTranscripts={selectedTranscripts}
      />
    </div>
  );
}
