import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MarketPrice {
  commodity: string
  price: string
  change: number
  unit: string
}

interface MarketTickerProps {
  prices: MarketPrice[]
}

export function MarketTicker({ prices }: MarketTickerProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">🏪 Market Prices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {prices.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.commodity}</span>
              <span className="text-sm text-muted-foreground">/{item.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹{item.price}</span>
              <span
                className={`text-sm flex items-center gap-1 ${item.change > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {item.change > 0 ? "↗️" : "↘️"}
                {Math.abs(item.change)}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
