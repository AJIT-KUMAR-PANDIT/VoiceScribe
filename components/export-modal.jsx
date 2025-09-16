"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, FileText, File, Share2, Mail, Copy, CheckCircle } from "lucide-react"

export function ExportModal({ isOpen, onClose, transcripts = [], selectedTranscripts = [] }) {
  const [exportSettings, setExportSettings] = useState({
    format: "txt",
    includeTimestamps: true,
    includeConfidence: false,
    includeMetadata: true,
    fileName: "transcripts_export",
    dateRange: "all",
    language: "all",
    mergeFiles: false,
    customTemplate: false,
  })

  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const exportFormats = [
    { value: "txt", label: "Plain Text (.txt)", icon: FileText, description: "Simple text format" },
    { value: "pdf", label: "PDF Document (.pdf)", icon: File, description: "Formatted document" },
    { value: "docx", label: "Word Document (.docx)", icon: File, description: "Microsoft Word format" },
    { value: "json", label: "JSON Data (.json)", icon: FileText, description: "Structured data format" },
    { value: "csv", label: "CSV Spreadsheet (.csv)", icon: FileText, description: "Comma-separated values" },
    { value: "srt", label: "Subtitle File (.srt)", icon: FileText, description: "Video subtitle format" },
  ]

  const shareOptions = [
    { value: "email", label: "Email", icon: Mail, description: "Send via email" },
    { value: "copy", label: "Copy to Clipboard", icon: Copy, description: "Copy text content" },
    { value: "share", label: "System Share", icon: Share2, description: "Use system share dialog" },
  ]

  const handleExport = async () => {
    setIsExporting(true)

    // Mock export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock file content based on settings
    const exportData = generateExportData()

    // Mock file download
    console.log("Exporting:", exportData)

    setIsExporting(false)
    setExportComplete(true)

    // Auto close after success
    setTimeout(() => {
      setExportComplete(false)
      onClose()
    }, 2000)
  }

  const generateExportData = () => {
    const selectedData =
      selectedTranscripts.length > 0 ? transcripts.filter((t) => selectedTranscripts.includes(t.id)) : transcripts

    const exportData = {
      settings: exportSettings,
      transcripts: selectedData.map((transcript) => ({
        id: transcript.id,
        title: transcript.title,
        content: transcript.content,
        language: transcript.language,
        date: transcript.date,
        time: transcript.time,
        duration: transcript.duration,
        confidence: exportSettings.includeConfidence ? transcript.confidence : undefined,
        metadata: exportSettings.includeMetadata
          ? {
              wordCount: transcript.wordCount,
              hasAIInteraction: transcript.hasAIInteraction,
              isFavorite: transcript.isFavorite,
            }
          : undefined,
      })),
      exportedAt: new Date().toISOString(),
      totalTranscripts: selectedData.length,
    }

    return exportData
  }

  const handleShare = async (method) => {
    const exportData = generateExportData()

    switch (method) {
      case "email":
        // Mock email sharing
        console.log("Sharing via email:", exportData)
        break
      case "copy":
        // Mock clipboard copy
        const textContent = exportData.transcripts.map((t) => `${t.title}\n${t.content}\n---\n`).join("\n")
        navigator.clipboard.writeText(textContent)
        break
      case "share":
        // Mock system share
        if (navigator.share) {
          navigator.share({
            title: "Transcription Export",
            text: "Exported transcripts from VoiceScribe",
            files: [], // Would contain actual files
          })
        }
        break
    }
  }

  const getEstimatedSize = () => {
    const selectedData =
      selectedTranscripts.length > 0 ? transcripts.filter((t) => selectedTranscripts.includes(t.id)) : transcripts

    const totalChars = selectedData.reduce((sum, t) => sum + t.content.length, 0)
    const sizeKB = Math.round((totalChars / 1024) * 1.2) // Rough estimate with formatting

    return sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`
  }

  if (exportComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <DialogTitle>Export Complete!</DialogTitle>
            </div>
            <DialogDescription>Your transcripts have been successfully exported.</DialogDescription>
          </DialogHeader>

          <div className="text-center py-4">
            <div className="text-2xl font-bold text-primary mb-2">
              {selectedTranscripts.length || transcripts.length} transcripts
            </div>
            <div className="text-sm text-muted-foreground">
              Exported as {exportFormats.find((f) => f.value === exportSettings.format)?.label}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Transcripts
          </DialogTitle>
          <DialogDescription>Configure your export settings and download your transcripts.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Summary */}
          <Card className="p-4 transition-transform duration-200 hover:scale-[1.01]">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {selectedTranscripts.length || transcripts.length}
                </div>
                <div className="text-sm text-muted-foreground">Transcripts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{getEstimatedSize()}</div>
                <div className="text-sm text-muted-foreground">Est. Size</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {new Set(transcripts.map((t) => t.language)).size}
                </div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
            </div>
          </Card>

          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => {
                const Icon = format.icon
                return (
                  <Card
                    key={format.value}
                    className={`p-3 cursor-pointer transition-colors duration-200 hover:bg-muted/50 ${
                      exportSettings.format === format.value ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setExportSettings((prev) => ({ ...prev, format: format.value }))}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-xs text-muted-foreground">{format.description}</div>
                      </div>
                      {exportSettings.format === format.value && <CheckCircle className="w-4 h-4 text-primary" />}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Export Options</Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between transition-transform duration-200 hover:scale-[1.01] p-2 rounded-md">
                <div>
                  <Label className="text-sm font-medium">Include Timestamps</Label>
                  <p className="text-xs text-muted-foreground">Add time markers to text</p>
                </div>
                <Switch
                  checked={exportSettings.includeTimestamps}
                  onCheckedChange={(checked) => setExportSettings((prev) => ({ ...prev, includeTimestamps: checked }))}
                />
              </div>

              <div className="flex items-center justify-between transition-transform duration-200 hover:scale-[1.01] p-2 rounded-md">
                <div>
                  <Label className="text-sm font-medium">Include Confidence</Label>
                  <p className="text-xs text-muted-foreground">Show accuracy scores</p>
                </div>
                <Switch
                  checked={exportSettings.includeConfidence}
                  onCheckedChange={(checked) => setExportSettings((prev) => ({ ...prev, includeConfidence: checked }))}
                />
              </div>

              <div className="flex items-center justify-between transition-transform duration-200 hover:scale-[1.01] p-2 rounded-md">
                <div>
                  <Label className="text-sm font-medium">Include Metadata</Label>
                  <p className="text-xs text-muted-foreground">Add file information</p>
                </div>
                <Switch
                  checked={exportSettings.includeMetadata}
                  onCheckedChange={(checked) => setExportSettings((prev) => ({ ...prev, includeMetadata: checked }))}
                />
              </div>

              <div className="flex items-center justify-between transition-transform duration-200 hover:scale-[1.01] p-2 rounded-md">
                <div>
                  <Label className="text-sm font-medium">Merge Files</Label>
                  <p className="text-xs text-muted-foreground">Combine into single file</p>
                </div>
                <Switch
                  checked={exportSettings.mergeFiles}
                  onCheckedChange={(checked) => setExportSettings((prev) => ({ ...prev, mergeFiles: checked }))}
                />
              </div>
            </div>
          </div>

          {/* File Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">File Name</Label>
            <Input
              value={exportSettings.fileName}
              onChange={(e) => setExportSettings((prev) => ({ ...prev, fileName: e.target.value }))}
              placeholder="Enter file name"
              className="transition-all duration-200 focus:border-primary focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">Extension will be added automatically based on format</p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date Range</Label>
              <Select
                value={exportSettings.dateRange}
                onValueChange={(value) => setExportSettings((prev) => ({ ...prev, dateRange: value }))}
              >
                <SelectTrigger className="transition-all duration-200 hover:border-primary focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Language Filter</Label>
              <Select
                value={exportSettings.language}
                onValueChange={(value) => setExportSettings((prev) => ({ ...prev, language: value }))}
              >
                <SelectTrigger className="transition-all duration-200 hover:border-primary focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="hindi">Hindi Only</SelectItem>
                  <SelectItem value="english">English Only</SelectItem>
                  <SelectItem value="tamil">Tamil Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Share Options */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Quick Share</Label>
            <div className="flex gap-2">
              {shareOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(option.value)}
                    className="flex-1 transition-transform duration-220 hover:scale-[1.02]"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="transition-transform duration-200 hover:scale-95">
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting} className="transition-transform duration-200 hover:scale-[1.02]">
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
