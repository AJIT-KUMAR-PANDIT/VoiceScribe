"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Mic,
  Volume2,
  Languages,
  Bot,
  Download,
  Shield,
  Trash2,
  RefreshCw,
  CheckCircle,
  ExternalLink,
} from "lucide-react"

export function SettingsScreen() {
  const [settings, setSettings] = useState({
    // Audio Settings
    microphoneGain: [75],
    noiseReduction: true,
    autoGainControl: true,
    echoCancellation: true,

    // Language Settings
    primaryLanguage: "hindi",
    autoDetectLanguage: true,
    fallbackLanguage: "english",

    // AI Settings
    aiModel: "llama-3.1-8b",
    aiModelSource: "website",
    customModelUrl: "https://llm.nakprc.com/test",
    driveBackupUrl: "https://drive.google.com/file/d/1NClfrgtmPoYRhlPbKqpdVEaLwenLYgTx/view",
    aiResponseSpeed: [50],
    enableVoiceResponse: true,

    // Transcription Settings
    confidenceThreshold: [85],
    punctuationMode: "auto",
    timestampFormat: "12hour",
    autoSave: true,
    saveInterval: [30],

    // Privacy Settings
    localProcessing: true,
    dataRetention: [30],
    anonymizeData: false,

    // Export Settings
    defaultExportFormat: "txt",
    includeTimestamps: true,
    includeConfidence: false,

    // Background Settings
    backgroundRecording: true,
    callTranscription: false,
    batteryOptimization: true,
  })

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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

  const aiModels = [
    { value: "llama-3.1-8b", label: "Llama 3.1 8B", size: "4.7GB", description: "Balanced performance" },
    { value: "llama-3.1-70b", label: "Llama 3.1 70B", size: "39GB", description: "High accuracy" },
    { value: "mistral-7b", label: "Mistral 7B", size: "4.1GB", description: "Fast inference" },
    { value: "codellama-13b", label: "CodeLlama 13B", size: "7.3GB", description: "Code-focused" },
  ]

  const handleResetSettings = () => {
    // Mock reset functionality
    console.log("Resetting settings to defaults")
  }

  const handleClearData = () => {
    // Mock clear data functionality
    console.log("Clearing all app data")
  }

  const handleDownloadModel = (model) => {
    // Mock model download
    console.log("Downloading model:", model)
  }

  const handleTestMicrophone = () => {
    // Mock microphone test
    console.log("Testing microphone")
  }

  const handleExportSettings = () => {
    // Mock settings export
    console.log("Exporting settings")
  }

  return (
    <div className="p-6 space-y-6 pb-20 transition-colors duration-300">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your transcription experience</p>
      </div>

      <Tabs defaultValue="audio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="audio" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Mic className="w-4 h-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Bot className="w-4 h-4" />
            AI
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <Settings className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Audio Settings */}
        <TabsContent value="audio" className="space-y-6">
          <Card className="p-6 space-y-6 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-4">
              <Mic className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Audio Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Microphone Gain</Label>
                <div className="mt-2">
                  <Slider
                    value={settings.microphoneGain}
                    onValueChange={(value) => updateSetting("microphoneGain", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>{settings.microphoneGain[0]}%</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Noise Reduction</Label>
                  <Switch
                    checked={settings.noiseReduction}
                    onCheckedChange={(checked) => updateSetting("noiseReduction", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Auto Gain Control</Label>
                  <Switch
                    checked={settings.autoGainControl}
                    onCheckedChange={(checked) => updateSetting("autoGainControl", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Echo Cancellation</Label>
                  <Switch
                    checked={settings.echoCancellation}
                    onCheckedChange={(checked) => updateSetting("echoCancellation", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Background Recording</Label>
                  <Switch
                    checked={settings.backgroundRecording}
                    onCheckedChange={(checked) => updateSetting("backgroundRecording", checked)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Playback Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Enable Voice Response</Label>
                <Switch
                  checked={settings.enableVoiceResponse}
                  onCheckedChange={(checked) => updateSetting("enableVoiceResponse", checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="p-6 space-y-6 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Model Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">AI Model</Label>
                <Select
                  value={settings.aiModel}
                  onValueChange={(value) => updateSetting("aiModel", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between">
                          <span>{model.label}</span>
                          <Badge variant="secondary">{model.size}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{model.description}</p>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">AI Model Source</Label>
                <Select
                  value={settings.aiModelSource}
                  onValueChange={(value) => updateSetting("aiModelSource", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select AI Model Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {settings.aiModelSource === "local" && (
                <div>
                  <Label className="text-sm font-medium">Custom Model URL</Label>
                  <Input
                    type="text"
                    value={settings.customModelUrl}
                    onChange={(e) => updateSetting("customModelUrl", e.target.value)}
                    placeholder="Enter custom model URL"
                  />
                </div>
              )}

              {settings.aiModelSource === "website" && (
                <div>
                  <Label className="text-sm font-medium">Drive Backup URL</Label>
                  <Input
                    type="text"
                    value={settings.driveBackupUrl}
                    onChange={(e) => updateSetting("driveBackupUrl", e.target.value)}
                    placeholder="Enter Google Drive backup URL"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">AI Response Speed</Label>
                <div className="w-1/2">
                  <Slider
                    value={settings.aiResponseSpeed}
                    onValueChange={(value) => updateSetting("aiResponseSpeed", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Slow</span>
                    <span>{settings.aiResponseSpeed[0]}%</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleDownloadModel(settings.aiModel)} className="w-full transition-transform duration-200 hover:scale-105">
                <Download className="w-4 h-4 mr-2" /> Download Selected Model
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6 space-y-6 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Data Privacy</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Local Processing Only</Label>
                <Switch
                  checked={settings.localProcessing}
                  onCheckedChange={(checked) => updateSetting("localProcessing", checked)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Data Retention (days)</Label>
                <Slider
                  value={settings.dataRetention}
                  onValueChange={(value) => updateSetting("dataRetention", value)}
                  max={365}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 Day</span>
                  <span>{settings.dataRetention[0]} Days</span>
                  <span>365 Days</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Anonymize Data</Label>
                <Switch
                  checked={settings.anonymizeData}
                  onCheckedChange={(checked) => updateSetting("anonymizeData", checked)}
                />
              </div>

              <Button onClick={handleClearData} variant="destructive" className="w-full transition-transform duration-200 hover:scale-105">
                <Trash2 className="w-4 h-4 mr-2" /> Clear All App Data
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="p-6 space-y-6 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">General</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Primary Language</Label>
                <Select
                  value={settings.primaryLanguage}
                  onValueChange={(value) => updateSetting("primaryLanguage", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select primary language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.flag} {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Auto Detect Language</Label>
                <Switch
                  checked={settings.autoDetectLanguage}
                  onCheckedChange={(checked) => updateSetting("autoDetectLanguage", checked)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Fallback Language</Label>
                <Select
                  value={settings.fallbackLanguage}
                  onValueChange={(value) => updateSetting("fallbackLanguage", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select fallback language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.flag} {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Auto Save Transcriptions</Label>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting("autoSave", checked)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Save Interval (seconds)</Label>
                <Slider
                  value={settings.saveInterval}
                  onValueChange={(value) => updateSetting("saveInterval", value)}
                  max={300}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10s</span>
                  <span>{settings.saveInterval[0]}s</span>
                  <span>300s</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Confidence Threshold</Label>
                <Slider
                  value={settings.confidenceThreshold}
                  onValueChange={(value) => updateSetting("confidenceThreshold", value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>{settings.confidenceThreshold[0]}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Punctuation Mode</Label>
                <Select
                  value={settings.punctuationMode}
                  onValueChange={(value) => updateSetting("punctuationMode", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select punctuation mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Timestamp Format</Label>
                <Select
                  value={settings.timestampFormat}
                  onValueChange={(value) => updateSetting("timestampFormat", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select timestamp format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12hour">12-hour</SelectItem>
                    <SelectItem value="24hour">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleResetSettings} variant="outline" className="w-full transition-transform duration-200 hover:scale-105">
                <RefreshCw className="w-4 h-4 mr-2" /> Reset All Settings
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-6 transition-transform duration-200 hover:scale-[1.01]">
            <div className="flex items-center gap-2 mb-4">
              <Download className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Export Options</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Default Export Format</Label>
                <Select
                  value={settings.defaultExportFormat}
                  onValueChange={(value) => updateSetting("defaultExportFormat", value)}
                >
                  <SelectTrigger className="w-full transition-transform duration-200 hover:scale-[1.01]">
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                    <SelectItem value="srt">SRT (.srt)</SelectItem>
                    <SelectItem value="vtt">VTT (.vtt)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Include Timestamps</Label>
                <Switch
                  checked={settings.includeTimestamps}
                  onCheckedChange={(checked) => updateSetting("includeTimestamps", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Include Confidence Scores</Label>
                <Switch
                  checked={settings.includeConfidence}
                  onCheckedChange={(checked) => updateSetting("includeConfidence", checked)}
                />
              </div>

              <Button onClick={handleExportSettings} className="w-full transition-transform duration-200 hover:scale-105">
                <ExternalLink className="w-4 h-4 mr-2" /> Export Current Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
