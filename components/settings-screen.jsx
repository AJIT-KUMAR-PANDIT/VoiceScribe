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
    <div className="p-6 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your transcription experience</p>
      </div>

      <Tabs defaultValue="audio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Mic className="w-4 h-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            AI
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Audio Settings */}
        <TabsContent value="audio" className="space-y-6">
          <Card className="p-6 space-y-6">
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

              <div className="pt-4">
                <Button variant="outline" onClick={handleTestMicrophone}>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Test Microphone
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Language Settings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Primary Language</Label>
                <Select
                  value={settings.primaryLanguage}
                  onValueChange={(value) => updateSetting("primaryLanguage", value)}
                >
                  <SelectTrigger>
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

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-detect Language</Label>
                  <p className="text-xs text-muted-foreground">Automatically identify spoken language</p>
                </div>
                <Switch
                  checked={settings.autoDetectLanguage}
                  onCheckedChange={(checked) => updateSetting("autoDetectLanguage", checked)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Fallback Language</Label>
                <Select
                  value={settings.fallbackLanguage}
                  onValueChange={(value) => updateSetting("fallbackLanguage", value)}
                >
                  <SelectTrigger>
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
            </div>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Model Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">AI Model</Label>
                <Select value={settings.aiModel} onValueChange={(value) => updateSetting("aiModel", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{model.label}</div>
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {model.size}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Model Source Priority</Label>
                <Select value={settings.aiModelSource} onValueChange={(value) => updateSetting("aiModelSource", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website (Primary)</SelectItem>
                    <SelectItem value="drive">Google Drive (Fallback)</SelectItem>
                    <SelectItem value="local">Local Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Custom Model URL</Label>
                <Input
                  value={settings.customModelUrl}
                  onChange={(e) => updateSetting("customModelUrl", e.target.value)}
                  placeholder="https://your-model-source.com"
                />
                <p className="text-xs text-muted-foreground mt-1">Primary source for downloading AI models</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Drive Backup URL</Label>
                <Input
                  value={settings.driveBackupUrl}
                  onChange={(e) => updateSetting("driveBackupUrl", e.target.value)}
                  placeholder="Google Drive link"
                />
                <p className="text-xs text-muted-foreground mt-1">Fallback source if primary URL fails</p>
              </div>

              <div className="pt-4">
                <Button variant="outline" onClick={() => handleDownloadModel(settings.aiModel)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Selected Model
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h3 className="text-lg font-semibold">AI Behavior</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Response Speed</Label>
                <div className="mt-2">
                  <Slider
                    value={settings.aiResponseSpeed}
                    onValueChange={(value) => updateSetting("aiResponseSpeed", value)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Accurate</span>
                    <span>{settings.aiResponseSpeed[0]}%</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Voice Response</Label>
                  <p className="text-xs text-muted-foreground">AI speaks responses aloud</p>
                </div>
                <Switch
                  checked={settings.enableVoiceResponse}
                  onCheckedChange={(checked) => updateSetting("enableVoiceResponse", checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Privacy & Security</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Local Processing Only</Label>
                  <p className="text-xs text-muted-foreground">All data stays on your device</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={settings.localProcessing}
                    onCheckedChange={(checked) => updateSetting("localProcessing", checked)}
                  />
                  {settings.localProcessing && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Data Retention (days)</Label>
                <div className="mt-2">
                  <Slider
                    value={settings.dataRetention}
                    onValueChange={(value) => updateSetting("dataRetention", value)}
                    max={365}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 day</span>
                    <span>{settings.dataRetention[0]} days</span>
                    <span>1 year</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Anonymize Data</Label>
                  <p className="text-xs text-muted-foreground">Remove personal identifiers</p>
                </div>
                <Switch
                  checked={settings.anonymizeData}
                  onCheckedChange={(checked) => updateSetting("anonymizeData", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Call Transcription</Label>
                  <p className="text-xs text-muted-foreground">Transcribe phone calls (requires permissions)</p>
                </div>
                <Switch
                  checked={settings.callTranscription}
                  onCheckedChange={(checked) => updateSetting("callTranscription", checked)}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Data Management</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Storage Used</Label>
                <div className="text-2xl font-bold text-primary">2.4 GB</div>
                <p className="text-xs text-muted-foreground">Transcripts, models, and cache</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Total Transcripts</Label>
                <div className="text-2xl font-bold text-primary">127</div>
                <p className="text-xs text-muted-foreground">Across all languages</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleClearData}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
              <Button variant="outline" onClick={handleExportSettings}>
                <Download className="w-4 h-4 mr-2" />
                Export Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Advanced Configuration</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Confidence Threshold (%)</Label>
                <div className="mt-2">
                  <Slider
                    value={settings.confidenceThreshold}
                    onValueChange={(value) => updateSetting("confidenceThreshold", value)}
                    max={100}
                    min={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50%</span>
                    <span>{settings.confidenceThreshold[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Minimum confidence to display transcribed text</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Punctuation Mode</Label>
                <Select
                  value={settings.punctuationMode}
                  onValueChange={(value) => updateSetting("punctuationMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automatic</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Timestamp Format</Label>
                <Select
                  value={settings.timestampFormat}
                  onValueChange={(value) => updateSetting("timestampFormat", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12hour">12-hour (2:30 PM)</SelectItem>
                    <SelectItem value="24hour">24-hour (14:30)</SelectItem>
                    <SelectItem value="relative">Relative (2m 30s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-save Transcripts</Label>
                  <p className="text-xs text-muted-foreground">Automatically save during recording</p>
                </div>
                <Switch checked={settings.autoSave} onCheckedChange={(checked) => updateSetting("autoSave", checked)} />
              </div>

              {settings.autoSave && (
                <div>
                  <Label className="text-sm font-medium">Save Interval (seconds)</Label>
                  <div className="mt-2">
                    <Slider
                      value={settings.saveInterval}
                      onValueChange={(value) => updateSetting("saveInterval", value)}
                      max={300}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>10s</span>
                      <span>{settings.saveInterval[0]}s</span>
                      <span>5m</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Export Settings</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Default Export Format</Label>
                <Select
                  value={settings.defaultExportFormat}
                  onValueChange={(value) => updateSetting("defaultExportFormat", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                    <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                    <SelectItem value="docx">Word Document (.docx)</SelectItem>
                    <SelectItem value="json">JSON Data (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Include Timestamps</Label>
                  <Switch
                    checked={settings.includeTimestamps}
                    onCheckedChange={(checked) => updateSetting("includeTimestamps", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Include Confidence</Label>
                  <Switch
                    checked={settings.includeConfidence}
                    onCheckedChange={(checked) => updateSetting("includeConfidence", checked)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">System</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Battery Optimization</Label>
                  <p className="text-xs text-muted-foreground">Reduce power consumption</p>
                </div>
                <Switch
                  checked={settings.batteryOptimization}
                  onCheckedChange={(checked) => updateSetting("batteryOptimization", checked)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleResetSettings}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
