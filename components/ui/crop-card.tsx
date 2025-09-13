import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CropCardProps {
  name: string
  area: string
  status: "healthy" | "attention" | "critical"
  daysOld: number
  nextAction?: string
}

export function CropCard({ name, area, status, daysOld, nextAction }: CropCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200"
      case "attention":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCropIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "rice":
        return "🌾"
      case "coconut":
        return "🥥"
      case "pepper":
      case "black pepper":
        return "🌶️"
      case "cardamom":
        return "🌿"
      default:
        return "🌱"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <span className="text-xl bg-green-100 p-1 rounded" style={{ color: "#16a34a" }}>
              {getCropIcon(name)}
            </span>
            {name}
          </CardTitle>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground">Area: {area}</div>
        <div className="text-sm text-muted-foreground">{daysOld} days old</div>
        {nextAction && <div className="text-sm font-medium text-primary">Next: {nextAction}</div>}
      </CardContent>
    </Card>
  )
}
