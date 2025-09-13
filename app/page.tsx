import { WeatherCard } from "@/components/ui/weather-card"
import { CropCard } from "@/components/ui/crop-card"
import { MarketTicker } from "@/components/ui/market-ticker"
import { AIAssistantPreview } from "@/components/ui/ai-assistant-preview"
import { RecommendationsCard } from "@/components/ui/recommendations-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthGuard } from "@/components/ui/auth-guard"
import Link from "next/link"

export default function Dashboard() {
  // Mock data for demonstration
  const weatherData = {
    location: "Wayanad, Kerala",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    uvIndex: 7,
    rainChance: 60,
  }

  const crops = [
    { name: "Rice", area: "2.5 acres", status: "healthy" as const, daysOld: 45, nextAction: "Apply fertilizer" },
    { name: "Coconut", area: "1 acre", status: "attention" as const, daysOld: 1200, nextAction: "Check for pests" },
    { name: "Black Pepper", area: "0.5 acres", status: "healthy" as const, daysOld: 180 },
  ]

  const marketPrices = [
    { commodity: "Rice (Matta)", price: "2,150", change: 2.3, unit: "quintal" },
    { commodity: "Coconut", price: "12", change: -1.8, unit: "piece" },
    { commodity: "Black Pepper", price: "420", change: 5.2, unit: "kg" },
  ]

  const recommendations = [
    { task: "Check rice plants for brown plant hopper", priority: "high" as const, timeframe: "Today" },
    { task: "Apply organic fertilizer to coconut trees", priority: "medium" as const, timeframe: "This week" },
    { task: "Prepare drainage for expected rainfall", priority: "high" as const, timeframe: "Tomorrow" },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary">Krishi Sakhi</h1>
                  <p className="text-xs text-muted-foreground">AI Farming Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  🔔
                </Button>
                <Button variant="ghost" size="sm">
                  ⚙️
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-balance">Welcome back, Farmer! 👋</h2>
              <p className="text-muted-foreground text-pretty">Here's your farm overview for today</p>
            </div>

            {/* Weather Card - Full Width */}
            <Link href="/weather">
              <WeatherCard {...weatherData} />
            </Link>

            {/* Crops Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">🌱 My Crops</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {crops.map((crop, index) => (
                  <CropCard key={index} {...crop} />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-green-600">+23%</div>
                  <div className="text-sm text-muted-foreground">Yield Increase</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-blue-600">₹45,000</div>
                  <div className="text-sm text-muted-foreground">Monthly Income</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-orange-600">4.2 acres</div>
                  <div className="text-sm text-muted-foreground">Total Area</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-purple-600">94%</div>
                  <div className="text-sm text-muted-foreground">Health Score</div>
                </CardContent>
              </Card>
            </div>

            {/* AI Assistant */}
            <AIAssistantPreview />

            {/* Recommendations */}
            <RecommendationsCard recommendations={recommendations} />

            {/* Market Prices */}
            <Link href="/market">
              <MarketTicker prices={marketPrices} />
            </Link>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/chat">
                <Button className="w-full h-16 flex-col gap-2 bg-primary hover:bg-primary/90">
                  <span className="text-xl">💬</span>
                  <span className="text-sm">Ask AI</span>
                </Button>
              </Link>
              <Link href="/scanner">
                <Button className="w-full h-16 flex-col gap-2 bg-secondary hover:bg-secondary/90">
                  <span className="text-xl">📸</span>
                  <span className="text-sm">Scan Plant</span>
                </Button>
              </Link>
              <Link href="/weather">
                <Button className="w-full h-16 flex-col gap-2 bg-accent hover:bg-accent/90">
                  <span className="text-xl">🌤️</span>
                  <span className="text-sm">Weather</span>
                </Button>
              </Link>
              <Link href="/market">
                <Button className="w-full h-16 flex-col gap-2 bg-green-600 hover:bg-green-700">
                  <span className="text-xl">📊</span>
                  <span className="text-sm">Market</span>
                </Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-around h-16">
              <Link href="/">
                <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                  <span className="text-lg">🏠</span>
                  <span className="text-xs">Home</span>
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                  <span className="text-lg">💬</span>
                  <span className="text-xs">Chat</span>
                </Button>
              </Link>
              <Link href="/scanner">
                <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                  <span className="text-lg">📸</span>
                  <span className="text-xs">Scanner</span>
                </Button>
              </Link>
              <Link href="/community">
                <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                  <span className="text-lg">👥</span>
                  <span className="text-xs">Community</span>
                </Button>
              </Link>
              <Button variant="ghost" className="flex-col gap-1 h-auto py-2">
                <span className="text-lg">👤</span>
                <span className="text-xs">Profile</span>
              </Button>
            </div>
          </div>
        </nav>

        {/* Bottom padding to account for fixed navigation */}
        <div className="h-16" />
      </div>
    </AuthGuard>
  )
}
