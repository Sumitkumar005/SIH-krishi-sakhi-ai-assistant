import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherCardProps {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  uvIndex: number
  rainChance: number
}

export function WeatherCard({
  location,
  temperature,
  condition,
  humidity,
  windSpeed,
  uvIndex,
  rainChance,
}: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️"
      case "partly cloudy":
        return "🌤️"
      case "cloudy":
        return "⛅"
      case "rainy":
        return "🌧️"
      default:
        return "🌤️"
    }
  }

  return (
    <Card className="bg-gradient-primary text-white border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white/90">{location}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getWeatherIcon(condition)}</span>
            <div>
              <div className="text-3xl font-bold">{temperature}°C</div>
              <div className="text-white/80">{condition}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Humidity</span>
            <span>{humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Wind</span>
            <span>{windSpeed} km/h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">UV Index</span>
            <span>{uvIndex}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Rain</span>
            <span>{rainChance}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
