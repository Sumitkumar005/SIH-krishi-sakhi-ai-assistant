"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/ui/auth-guard"

interface HourlyForecast {
  time: string
  icon: string
  temp: number
  rain: number
}

interface Alert {
  type: "warning" | "info" | "critical"
  title: string
  description: string
  action: string
  icon: string
}

export default function WeatherPage() {
  const [selectedDay, setSelectedDay] = useState(0)

  const currentWeather = {
    location: "Wayanad, Kerala",
    temperature: 28,
    condition: "Partly Cloudy",
    feelsLike: 31,
    humidity: 68,
    windSpeed: 12,
    uvIndex: 7,
    visibility: 10,
    pressure: 1013,
  }

  const hourlyForecast: HourlyForecast[] = [
    { time: "2PM", icon: "☀️", temp: 28, rain: 0 },
    { time: "3PM", icon: "🌤️", temp: 29, rain: 20 },
    { time: "4PM", icon: "⛅", temp: 27, rain: 40 },
    { time: "5PM", icon: "🌧️", temp: 25, rain: 80 },
    { time: "6PM", icon: "🌧️", temp: 24, rain: 90 },
    { time: "7PM", icon: "🌙", temp: 23, rain: 70 },
  ]

  const weeklyForecast = [
    { day: "Today", icon: "🌤️", high: 29, low: 23, rain: 60 },
    { day: "Tomorrow", icon: "🌧️", high: 26, low: 21, rain: 85 },
    { day: "Wednesday", icon: "⛅", high: 28, low: 22, rain: 40 },
    { day: "Thursday", icon: "☀️", high: 31, low: 24, rain: 10 },
    { day: "Friday", icon: "🌤️", high: 30, low: 23, rain: 30 },
    { day: "Saturday", icon: "🌧️", high: 27, low: 21, rain: 70 },
    { day: "Sunday", icon: "⛅", high: 29, low: 22, rain: 45 },
  ]

  const alerts: Alert[] = [
    {
      type: "warning",
      title: "Heavy Rain Expected",
      description: "40-60mm rainfall expected tomorrow. High risk of waterlogging in low-lying areas.",
      action: "Postpone spraying and ensure proper drainage",
      icon: "🌧️",
    },
    {
      type: "critical",
      title: "Pest Alert",
      description: "Brown plant hopper outbreak reported in nearby farms due to humid conditions.",
      action: "Monitor your rice crops closely",
      icon: "🐛",
    },
    {
      type: "info",
      title: "Irrigation Reminder",
      description: "Your coconut trees were last watered 3 days ago. Consider watering before the rain.",
      action: "Water coconut trees today",
      icon: "💧",
    },
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
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
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌤️</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">Weather Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Farming-focused forecasts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  📍
                </Button>
                <Button variant="ghost" size="sm">
                  🔔
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Current Weather */}
            <Card className="bg-gradient-accent text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white/90">{currentWeather.location}</h2>
                    <p className="text-white/70 text-sm">Updated 5 minutes ago</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    🔄
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">🌤️</span>
                    <div>
                      <div className="text-4xl font-bold">{currentWeather.temperature}°C</div>
                      <div className="text-white/80">{currentWeather.condition}</div>
                      <div className="text-white/70 text-sm">Feels like {currentWeather.feelsLike}°C</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-white/70">Humidity</div>
                    <div className="font-semibold">{currentWeather.humidity}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/70">Wind</div>
                    <div className="font-semibold">{currentWeather.windSpeed} km/h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/70">UV Index</div>
                    <div className="font-semibold">{currentWeather.uvIndex}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/70">Visibility</div>
                    <div className="font-semibold">{currentWeather.visibility} km</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hourly Forecast */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">⏰ Hourly Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {hourlyForecast.map((hour, index) => (
                    <div key={index} className="flex-shrink-0 text-center space-y-2 p-3 rounded-lg bg-muted/50">
                      <div className="text-sm font-medium">{hour.time}</div>
                      <div className="text-2xl">{hour.icon}</div>
                      <div className="font-semibold">{hour.temp}°</div>
                      <div className="text-xs text-blue-600">{hour.rain}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agricultural Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">⚠️ Farming Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{alert.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm mb-2">{alert.description}</p>
                        <div className="text-sm font-medium">📋 Action: {alert.action}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Forecast */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📅 7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyForecast.map((day, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedDay === index ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedDay(index)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{day.icon}</span>
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-muted-foreground">Rain: {day.rain}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {day.high}° / {day.low}°
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                <span className="text-xl">🔔</span>
                <span className="text-sm">Set Alerts</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-green-600 hover:bg-green-700">
                <span className="text-xl">🌧️</span>
                <span className="text-sm">Rain Radar</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                <span className="text-xl">📊</span>
                <span className="text-sm">History</span>
              </Button>
              <Button className="h-16 flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                <span className="text-xl">📤</span>
                <span className="text-sm">Share</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
