"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [step, setStep] = useState<"welcome" | "phone" | "otp" | "profile">("welcome")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [language, setLanguage] = useState<"english" | "malayalam">("english")
  const [isLoading, setIsLoading] = useState(false)

  const [fullName, setFullName] = useState("")
  const [location, setLocation] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])

  const handleSendOTP = () => {
    if (phoneNumber.length === 10) {
      setStep("otp")
    }
  }

  const handleVerifyOTP = () => {
    if (otp === "123456") {
      setStep("profile")
    }
  }

  const handleCompleteProfile = async () => {
    setIsLoading(true)
    console.log("[v0] Starting profile completion...")

    localStorage.setItem("krishi-auth-token", "authenticated")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Profile completed, navigating to dashboard...")
    router.push("/")
  }

  const handleSkipProfile = async () => {
    setIsLoading(true)
    console.log("[v0] Skipping profile setup...")

    localStorage.setItem("krishi-auth-token", "authenticated")

    await new Promise((resolve) => setTimeout(resolve, 800))

    console.log("[v0] Navigating to dashboard...")
    router.push("/")
  }

  const toggleCrop = (crop: string) => {
    setSelectedCrops((prev) => (prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]))
  }

  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="text-white text-4xl font-bold">K</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent text-balance">
                Krishi Sakhi
              </h1>
              <p className="text-lg text-muted-foreground text-balance">Your AI-Powered Farming Companion</p>
              <p className="text-sm text-muted-foreground text-pretty">കേരളത്തിന്റെ കൃഷിക്ക് അനുയോജ്യമായ AI സാങ്കേതികവിദ്യ</p>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700">
              Official Government App
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
              Secure
            </Badge>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-100 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-lg">Choose Language / ഭാഷ തിരഞ്ഞെടുക്കുക</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant={language === "english" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setLanguage("english")}
              >
                🇬🇧 English
              </Button>
              <Button
                variant={language === "malayalam" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setLanguage("malayalam")}
              >
                🇮🇳 മലയാളം
              </Button>
            </CardContent>
          </Card>

          <Button
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => setStep("phone")}
            style={{ backgroundColor: "#16a34a" }}
          >
            Get Started / ആരംഭിക്കുക
          </Button>

          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl">🤖</div>
              <div className="font-medium">AI Guidance</div>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl">📸</div>
              <div className="font-medium">Plant Scanner</div>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl">🌤️</div>
              <div className="font-medium">Weather Alerts</div>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="text-2xl">💰</div>
              <div className="font-medium">Market Prices</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "phone") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary">Enter Phone Number</h2>
            <p className="text-muted-foreground">We'll send you a verification code</p>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-100 dark:border-green-800">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm">+91</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    className="flex-1"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSendOTP}
                disabled={phoneNumber.length !== 10}
              >
                Send OTP
              </Button>
            </CardContent>
          </Card>

          <Button variant="ghost" onClick={() => setStep("welcome")} className="w-full">
            ← Back
          </Button>
        </div>
      </div>
    )
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary">Verify OTP</h2>
            <p className="text-muted-foreground">Enter the 6-digit code sent to +91 {phoneNumber}</p>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-100 dark:border-green-800">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Verification Code</label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-xs text-muted-foreground text-center">Demo: Use 123456 as OTP</p>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
              >
                Verify & Continue
              </Button>

              <Button variant="ghost" className="w-full text-sm">
                Resend OTP (30s)
              </Button>
            </CardContent>
          </Card>

          <Button variant="ghost" onClick={() => setStep("phone")} className="w-full">
            ← Change Number
          </Button>
        </div>
      </div>
    )
  }

  if (step === "profile") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-green-950 dark:via-gray-900 dark:to-blue-950 flex items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary">Complete Your Profile</h2>
            <p className="text-muted-foreground">Help us personalize your farming experience</p>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-100 dark:border-green-800">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Village, District" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Crops</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Rice", "Coconut", "Pepper", "Cardamom", "Rubber", "Other"].map((crop) => (
                    <Button
                      key={crop}
                      variant={selectedCrops.includes(crop) ? "default" : "outline"}
                      size="sm"
                      className={`justify-start transition-all duration-200 ${
                        selectedCrops.includes(crop)
                          ? "bg-green-600 hover:bg-green-700 text-white shadow-md transform scale-105"
                          : "hover:bg-green-50 dark:hover:bg-green-900"
                      }`}
                      onClick={() => toggleCrop(crop)}
                      disabled={isLoading}
                    >
                      {selectedCrops.includes(crop) && <CheckCircle className="w-3 h-3 mr-1" />}
                      {crop}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Farm Size</label>
                <Input placeholder="e.g., 2.5 acres" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} />
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onClick={handleCompleteProfile}
                disabled={isLoading}
                style={{ backgroundColor: isLoading ? "#9ca3af" : "#16a34a" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up your profile...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
              onClick={handleSkipProfile}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Skip for now →"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
