import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Recommendation {
  task: string
  priority: "high" | "medium" | "low"
  timeframe: string
}

interface RecommendationsCardProps {
  recommendations: Recommendation[]
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">📋 Today's Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium">{rec.task}</div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                <span className="text-xs text-muted-foreground">{rec.timeframe}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
