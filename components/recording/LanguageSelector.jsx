"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const languages = [
  { value: "hindi", label: "हिंदी", englishLabel: "Hindi", flag: "🇮🇳", popularity: 95 },
  { value: "english", label: "English", englishLabel: "English", flag: "🇺🇸", popularity: 100 },
  { value: "tamil", label: "தமிழ்", englishLabel: "Tamil", flag: "🇮🇳", popularity: 85 },
  { value: "telugu", label: "తెలుగు", englishLabel: "Telugu", flag: "🇮🇳", popularity: 80 },
  { value: "bengali", label: "বাংলা", englishLabel: "Bengali", flag: "🇮🇳", popularity: 75 },
  { value: "marathi", label: "मराठी", englishLabel: "Marathi", flag: "🇮🇳", popularity: 70 },
  { value: "gujarati", label: "ગુજરાતી", englishLabel: "Gujarati", flag: "🇮🇳", popularity: 65 },
  { value: "punjabi", label: "ਪੰਜਾਬੀ", englishLabel: "Punjabi", flag: "🇮🇳", popularity: 60 },
  { value: "kannada", label: "ಕನ್ನಡ", englishLabel: "Kannada", flag: "🇮🇳", popularity: 55 },
  { value: "malayalam", label: "മലയാളം", englishLabel: "Malayalam", flag: "🇮🇳", popularity: 50 },
  { value: "spanish", label: "Español", englishLabel: "Spanish", flag: "🇪🇸", popularity: 90 },
  { value: "french", label: "Français", englishLabel: "French", flag: "🇫🇷", popularity: 85 },
  { value: "german", label: "Deutsch", englishLabel: "German", flag: "🇩🇪", popularity: 80 },
  { value: "chinese", label: "中文", englishLabel: "Chinese", flag: "🇨🇳", popularity: 95 },
  { value: "japanese", label: "日本語", englishLabel: "Japanese", flag: "🇯🇵", popularity: 75 },
  { value: "korean", label: "한국어", englishLabel: "Korean", flag: "🇰🇷", popularity: 70 },
]

export function LanguageSelector({ 
  value, 
  onChange, 
  className,
  variant = "default" // default, compact, grid
}) {
  const selectedLang = languages.find(lang => lang.value === value)

  if (variant === "compact") {
    return (
      <div className={cn("relative", className)}>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={cn(
            "w-full glass backdrop-blur-md",
            "border-2 border-primary/20",
            "hover:border-primary/40 hover:scale-[1.02]",
            "transition-all duration-200",
            "focus:ring-2 focus:ring-primary/50"
          )}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedLang?.flag}</span>
              <span className="font-medium">{selectedLang?.englishLabel}</span>
            </div>
          </SelectTrigger>
          <SelectContent className="glass backdrop-blur-lg border-primary/20">
            {languages.map((lang) => (
              <SelectItem 
                key={lang.value} 
                value={lang.value}
                className="hover:bg-primary/10 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{lang.englishLabel}</div>
                    <div className="text-xs text-muted-foreground">{lang.label}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3", className)}>
        {languages.slice(0, 8).map((lang) => (
          <button
            key={lang.value}
            onClick={() => onChange(lang.value)}
            className={cn(
              "p-3 rounded-lg border-2 transition-all duration-200",
              "hover:scale-105 hover:shadow-lg",
              "flex flex-col items-center gap-1",
              value === lang.value 
                ? "border-primary bg-primary/10 shadow-md" 
                : "border-border hover:border-primary/50 glass"
            )}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="text-xs font-medium">{lang.englishLabel}</span>
            <span className="text-xs text-muted-foreground">{lang.label}</span>
          </button>
        ))}
      </div>
    )
  }

  // Default variant
  return (
    <Card className={cn(
      "p-4 sm:p-6",
      "glass-dark backdrop-blur-lg",
      "border-2 border-primary/20",
      "transform-gpu transition-all duration-500",
      "hover:shadow-xl hover:shadow-primary/10",
      className
    )}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Languages className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Select Language</h3>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Choose your preferred transcription language
              </p>
            </div>
          </div>
          
          {selectedLang && (
            <Badge 
              variant="secondary" 
              className="hidden lg:flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              {selectedLang.popularity}% accuracy
            </Badge>
          )}
        </div>

        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={cn(
            "w-full h-12 sm:h-14",
            "glass backdrop-blur-md",
            "border-2 border-primary/20",
            "hover:border-primary/40 hover:scale-[1.01]",
            "transition-all duration-200",
            "text-sm sm:text-base"
          )}>
            <SelectValue>
              {selectedLang && (
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">{selectedLang.flag}</span>
                  <div className="text-left">
                    <div className="font-semibold">{selectedLang.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedLang.englishLabel}
                    </div>
                  </div>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          
          <SelectContent className={cn(
            "glass backdrop-blur-xl",
            "border-2 border-primary/20",
            "max-h-[300px] sm:max-h-[400px]"
          )}>
            {/* Popular Languages */}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Popular
            </div>
            {languages
              .filter(lang => lang.popularity >= 80)
              .map((lang) => (
                <SelectItem 
                  key={lang.value} 
                  value={lang.value}
                  className={cn(
                    "hover:bg-primary/10 cursor-pointer",
                    "transition-colors duration-150"
                  )}
                >
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lang.label}</span>
                        {lang.popularity >= 90 && (
                          <Badge variant="secondary" className="text-xs py-0 px-1">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lang.englishLabel}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang.popularity}%
                    </div>
                  </div>
                </SelectItem>
              ))}
            
            {/* Other Languages */}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              All Languages
            </div>
            {languages
              .filter(lang => lang.popularity < 80)
              .map((lang) => (
                <SelectItem 
                  key={lang.value} 
                  value={lang.value}
                  className="hover:bg-primary/10 cursor-pointer"
                >
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{lang.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {lang.englishLabel}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lang.popularity}%
                    </div>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Quick Select Pills - Visible on larger screens */}
        <div className="hidden sm:flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Quick select:</span>
          {["english", "hindi", "spanish", "chinese"].map((langValue) => {
            const lang = languages.find(l => l.value === langValue)
            return (
              <button
                key={langValue}
                onClick={() => onChange(langValue)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs",
                  "border transition-all duration-200",
                  "hover:scale-105",
                  value === langValue
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                {lang?.flag} {lang?.englishLabel}
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}