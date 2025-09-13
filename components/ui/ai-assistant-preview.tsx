import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AIAssistantPreview() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">🤖 AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/80 rounded-lg p-3 text-sm">"Hello! How can I help you with your farming today?"</div>
        <Link href="/chat">
          <Button className="w-full bg-primary hover:bg-primary/90">Start Conversation</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
