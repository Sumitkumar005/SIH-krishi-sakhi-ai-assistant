"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/ui/auth-guard"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AnalysisResult {
  disease: string
  confidence: number
  severity: "low" | "medium" | "high"
  description: string
  treatment: string[]
  prevention: string[]
}

export default function ScannerPage() {
  const [step, setStep] = useState<"camera" | "analyzing" | "results">("camera")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mockAnalyze = () => {
    setStep("analyzing")
    setAnalysisProgress(0)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Mock analysis result
          setAnalysisResult({
            disease: "Leaf Spot Disease",
            confidence: 89,
            severity: "medium",
            description:
              "Brown leaf spot is a common fungal disease affecting rice plants. It appears as small, circular to oval spots with brown centers and yellow halos.",
            treatment: [
              "Apply copper-based fungicide spray",
              "Remove affected leaves and destroy them",
              "Improve air circulation around plants",
              "Reduce watering frequency temporarily",
            ],
            prevention: [
              "Ensure proper plant spacing",
              "Avoid overhead watering",
              "Apply preventive fungicide during humid weather",
              "Use disease-resistant varieties",
            ],
          })
          setStep("results")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      mockAnalyze()
    }
  }

  const handleTakePhoto = () => {
    // In a real app, this would open the camera
    mockAnalyze()
  }

  const handleRetry = () => {
    setStep("camera")
    setAnalysisResult(null)
    setAnalysisProgress(0)
  }

  if (step === "camera") {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                    ←
                  </Button>
                  <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">📸</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-primary">Plant Health Scanner</h1>
                    <p className="text-xs text-muted-foreground">AI-powered disease detection</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" title="Tips">
                  💡
                </Button>
              </div>
            </div>
          </header>

          {/* Camera Interface */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* Instructions */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">📋 Scanning Tips</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Hold your phone steady and ensure good lighting</li>
                    <li>• Focus on the affected area of the plant</li>
                    <li>• Take photos of both healthy and diseased parts</li>
                    <li>• Avoid shadows and blurry images</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Camera Viewfinder Mockup */}
              <Card className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300">
                <CardContent className="h-full flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 border-4 border-primary border-dashed rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-4xl">📱</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Position your plant here</p>
                      <p className="text-sm text-muted-foreground">
                        Hold steady and ensure the affected area is clearly visible
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full bg-transparent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  🖼️
                </Button>

                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-secondary hover:bg-secondary/90 text-white"
                  onClick={handleTakePhoto}
                >
                  📷
                </Button>

                <Button variant="outline" size="lg" className="w-16 h-16 rounded-full bg-transparent">
                  ⚡
                </Button>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

              {/* Recent Scans */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Recent Scans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🌿</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </AuthGuard>
    )
  }

  if (step === "analyzing") {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="text-white text-3xl">🔍</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">Analyzing Plant Health</h2>
                <p className="text-muted-foreground">Our AI is examining your plant image...</p>
              </div>

              <div className="space-y-2">
                <Progress value={analysisProgress} className="w-full" />
                <p className="text-sm text-muted-foreground">{analysisProgress}% Complete</p>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>🔍 Detecting plant species...</p>
                <p>🐛 Scanning for diseases and pests...</p>
                <p>📊 Analyzing health indicators...</p>
                <p>💡 Generating recommendations...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    )
  }

  if (step === "results" && analysisResult) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={handleRetry}>
                    ←
                  </Button>
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✅</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-primary">Analysis Complete</h1>
                    <p className="text-xs text-muted-foreground">Scan results ready</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  📤
                </Button>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-6">
              {/* Detection Result */}
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">🔍 Detection Result</CardTitle>
                    <Badge
                      className={`${
                        analysisResult.severity === "high"
                          ? "bg-red-100 text-red-800"
                          : analysisResult.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {analysisResult.severity} severity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{analysisResult.disease}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{analysisResult.confidence}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{analysisResult.description}</p>
                </CardContent>
              </Card>

              {/* Treatment Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">💊 Treatment Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.treatment.map((treatment, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{treatment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Prevention Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">🛡️ Prevention Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.prevention.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-16 flex-col gap-2 bg-primary hover:bg-primary/90">
                  <span className="text-xl">👨‍⚕️</span>
                  <span className="text-sm">Consult Expert</span>
                </Button>
                <Button className="h-16 flex-col gap-2 bg-secondary hover:bg-secondary/90">
                  <span className="text-xl">💬</span>
                  <span className="text-sm">Chat with AI</span>
                </Button>
                <Button className="h-16 flex-col gap-2 bg-accent hover:bg-accent/90">
                  <span className="text-xl">📋</span>
                  <span className="text-sm">Save to Records</span>
                </Button>
              </div>

              {/* Scan Another */}
              <Button variant="outline" className="w-full h-12 bg-transparent" onClick={handleRetry}>
                📸 Scan Another Plant
              </Button>
            </div>
          </main>
        </div>
      </AuthGuard>
    )
  }

  return null
}
