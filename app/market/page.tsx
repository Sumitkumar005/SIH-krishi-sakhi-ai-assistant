"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/ui/auth-guard"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface MarketPrice {
  commodity: string
  price: string
  change: number
  unit: string
  market: string
  quality: string
}

interface BuyerOpportunity {
  type: "direct" | "market" | "export"
  title: string
  commodity: string
  quantity: string
  price: string
  location: string
  distance: string
  contact: string
}

export default function MarketPage() {
  const [selectedTab, setSelectedTab] = useState<"prices" | "trends" | "opportunities">("prices")
  const [searchQuery, setSearchQuery] = useState("")

  const marketPrices: MarketPrice[] = [
    { commodity: "Rice (Matta)", price: "2,150", change: 2.3, unit: "quintal", market: "Kochi", quality: "Grade A" },
    { commodity: "Rice (Jyothi)", price: "2,050", change: 1.8, unit: "quintal", market: "Kochi", quality: "Grade A" },
    { commodity: "Coconut", price: "12", change: -1.8, unit: "piece", market: "Pollachi", quality: "Medium" },
    { commodity: "Black Pepper", price: "420", change: 5.2, unit: "kg", market: "Kochi Spices", quality: "Premium" },
    { commodity: "Cardamom", price: "1,200", change: 1.5, unit: "kg", market: "Kumily", quality: "8mm Bold" },
    { commodity: "Rubber", price: "165", change: -0.8, unit: "kg", market: "Kottayam", quality: "RSS-4" },
    { commodity: "Ginger", price: "45", change: 3.2, unit: "kg", market: "Ernakulam", quality: "Fresh" },
    { commodity: "Turmeric", price: "85", change: 2.1, unit: "kg", market: "Erode", quality: "Finger" },
  ]

  const buyerOpportunities: BuyerOpportunity[] = [
    {
      type: "direct",
      title: "Rice Exporter Seeking Bulk",
      commodity: "Rice (Matta)",
      quantity: "50 quintals",
      price: "₹2,180/quintal",
      location: "Kochi Port",
      distance: "42 km",
      contact: "Contact via app",
    },
    {
      type: "market",
      title: "Spices Market Premium Rate",
      commodity: "Black Pepper",
      quantity: "Any quantity",
      price: "₹425/kg",
      location: "Kochi Spices Market",
      distance: "38 km",
      contact: "9876543210",
    },
    {
      type: "export",
      title: "International Buyer",
      commodity: "Cardamom",
      quantity: "100+ kg",
      price: "₹1,250/kg",
      location: "Kumily",
      distance: "65 km",
      contact: "Export agent",
    },
  ]

  const filteredPrices = marketPrices.filter((item) => item.commodity.toLowerCase().includes(searchQuery.toLowerCase()))

  const getChangeColor = (change: number) => {
    return change > 0 ? "text-green-600" : "text-red-600"
  }

  const getChangeIcon = (change: number) => {
    return change > 0 ? "↗️" : "↘️"
  }

  const getOpportunityColor = (type: string) => {
    switch (type) {
      case "direct":
        return "bg-green-100 text-green-800 border-green-200"
      case "export":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "market":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

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
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">Market Intelligence</h1>
                  <p className="text-xs text-muted-foreground">Real-time prices & opportunities</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  🔔
                </Button>
                <Button variant="ghost" size="sm">
                  📊
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={selectedTab === "prices" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab("prices")}
                className="flex-1"
              >
                📊 Prices
              </Button>
              <Button
                variant={selectedTab === "trends" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab("trends")}
                className="flex-1"
              >
                📈 Trends
              </Button>
              <Button
                variant={selectedTab === "opportunities" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab("opportunities")}
                className="flex-1"
              >
                🤝 Opportunities
              </Button>
            </div>

            {selectedTab === "prices" && (
              <>
                {/* Search */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Search commodities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">🔍</Button>
                </div>

                {/* Market Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-green-600">↗️ 68%</div>
                      <div className="text-sm text-muted-foreground">Prices Rising</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600">₹2.1L</div>
                      <div className="text-sm text-muted-foreground">Avg. Daily Trade</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-orange-600">15</div>
                      <div className="text-sm text-muted-foreground">Active Markets</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-purple-600">5 min</div>
                      <div className="text-sm text-muted-foreground">Last Update</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Price List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">💰 Today's Market Prices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredPrices.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{item.commodity}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.market} • {item.quality}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              ₹{item.price}/{item.unit}
                            </div>
                            <div
                              className={`text-sm flex items-center gap-1 justify-end ${getChangeColor(item.change)}`}
                            >
                              {getChangeIcon(item.change)}
                              {Math.abs(item.change)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {selectedTab === "trends" && (
              <>
                {/* Price Trends Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">📈 Price Trends (30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="text-4xl">📊</div>
                        <div className="font-medium">Interactive Price Chart</div>
                        <div className="text-sm text-muted-foreground">Track commodity price movements over time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">💡 Market Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">🌾 Rice Market Outlook</h4>
                      <p className="text-sm text-green-800">
                        Prices trending upward due to increased export demand. Good time to sell if you have quality
                        stock ready.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">🌶️ Spices Surge</h4>
                      <p className="text-sm text-blue-800">
                        Black pepper and cardamom showing strong growth. International demand remains high.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-900 mb-2">🥥 Coconut Caution</h4>
                      <p className="text-sm text-orange-800">
                        Slight price dip due to seasonal supply increase. Consider value-added products.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {selectedTab === "opportunities" && (
              <>
                {/* Selling Opportunities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">🤝 Best Selling Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {buyerOpportunities.map((opportunity, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{opportunity.title}</h4>
                              <Badge className={getOpportunityColor(opportunity.type)}>{opportunity.type}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>
                                📦 {opportunity.commodity} • {opportunity.quantity}
                              </div>
                              <div>💰 {opportunity.price}</div>
                              <div>
                                📍 {opportunity.location} • {opportunity.distance} away
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            📞 Contact
                          </Button>
                          <Button size="sm" variant="outline">
                            📋 Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Register to Sell */}
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-4xl">🏪</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Want to Sell Your Produce?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Register your crops and get connected with buyers directly
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">📝 Register to Sell</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        🔍 Find Buyers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 flex-col gap-2 bg-green-600 hover:bg-green-700">
                <span className="text-xl">🔔</span>
                <span className="text-sm">Price Alerts</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                <span className="text-xl">📊</span>
                <span className="text-sm">Analytics</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                <span className="text-xl">📤</span>
                <span className="text-sm">Export Data</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                <span className="text-xl">🤝</span>
                <span className="text-sm">Connect</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
