"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthGuard } from "@/components/ui/auth-guard"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm Krishi Sakhi, your AI farming assistant. I can help you with crop management, pest control, weather advice, and market information. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Check my rice crop health",
        "Weather forecast for farming",
        "Market prices today",
        "Pest control advice",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("rice") && (message.includes("health") || message.includes("disease"))) {
      return "I can help you check your rice crop health! Based on the current season and your location in Kerala, here are some key things to monitor:\n\n🌾 **Common Issues This Season:**\n• Brown plant hopper - Check for yellowing leaves\n• Leaf blast - Look for diamond-shaped spots\n• Bacterial blight - Watch for water-soaked lesions\n\n📸 **Next Steps:**\nTake a photo of your rice plants using the Plant Scanner for detailed analysis. Would you like me to guide you through the scanning process?"
    }

    if (message.includes("weather") || message.includes("rain")) {
      return "🌤️ **Weather Update for Your Area:**\n\nToday: Partly cloudy, 28°C\nTomorrow: 60% chance of rain (40-60mm expected)\n\n⚠️ **Farming Recommendations:**\n• Postpone any pesticide spraying until after the rain\n• Ensure proper drainage in your fields\n• Cover harvested crops if stored outdoors\n• Good time for transplanting rice seedlings after rain\n\nWould you like detailed weather alerts for the next 7 days?"
    }

    if (message.includes("market") || message.includes("price")) {
      return "💰 **Today's Market Prices:**\n\n🌾 Rice (Matta): ₹2,150/quintal (↗️ +2.3%)\n🥥 Coconut: ₹12/piece (↘️ -1.8%)\n🌶️ Black Pepper: ₹420/kg (↗️ +5.2%)\n🌿 Cardamom: ₹1,200/kg (↗️ +1.5%)\n\n📈 **Market Insights:**\nRice prices are trending upward due to increased demand. Good time to sell if you have stock ready.\n\nWould you like me to set up price alerts for your crops?"
    }

    if (message.includes("pest") || message.includes("insect") || message.includes("bug")) {
      return "🐛 **Pest Control Guidance:**\n\nFor effective pest management in Kerala's climate:\n\n**Organic Solutions:**\n• Neem oil spray (10ml per liter water)\n• Pheromone traps for specific pests\n• Encourage beneficial insects\n\n**Chemical Control (if needed):**\n• Use only approved pesticides\n• Follow recommended dosage\n• Avoid spraying during flowering\n\n📸 **For Specific Identification:**\nTake a clear photo of the affected plant or pest using our Plant Scanner for targeted treatment recommendations.\n\nWhat crop are you dealing with?"
    }

    if (message.includes("fertilizer") || message.includes("nutrition")) {
      return "🌱 **Fertilizer Recommendations:**\n\n**For Rice (Current Stage):**\n• Apply 2nd dose of Urea (45 days after planting)\n• Add Potash for better grain filling\n• Consider organic compost for soil health\n\n**For Coconut:**\n• NPK 16:16:16 - 1.3kg per tree annually\n• Apply in 2-3 split doses\n• Add organic matter around the base\n\n**Timing Tips:**\n• Apply before expected rain for better absorption\n• Avoid fertilizing during drought conditions\n\nWhich specific crop needs fertilizer guidance?"
    }

    return "I understand you're asking about farming. I can help with:\n\n🌾 **Crop Management** - Growth stages, care tips\n🐛 **Pest & Disease Control** - Identification and treatment\n🌤️ **Weather Guidance** - Farming-specific forecasts\n💰 **Market Information** - Current prices and trends\n🌱 **Soil & Fertilizers** - Nutrition recommendations\n\nCould you be more specific about what you'd like to know? Or try taking a photo with the Plant Scanner for instant analysis!"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: ["Take a photo", "Get weather update", "Check market prices", "Ask another question"],
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                  ←
                </Button>
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">Krishi Sakhi</h1>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-muted-foreground">Online • Responds in 2 sec</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" title="Voice Input">
                  🎤
                </Button>
                <Button variant="ghost" size="sm" title="Translate">
                  🌐
                </Button>
                <Button variant="ghost" size="sm" title="Settings">
                  ⚙️
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === "user" ? "bg-primary text-white ml-4" : "bg-white border border-gray-200 mr-4"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      <div
                        className={`text-xs mt-2 ${message.type === "user" ? "text-white/70" : "text-muted-foreground"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    {message.type === "ai" && message.suggestions && (
                      <div className="mt-3 mr-4">
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-8 bg-transparent"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" ? "order-1 bg-blue-500 ml-2" : "order-2 bg-green-500 mr-2"
                    }`}
                  >
                    <span className="text-white text-sm">{message.type === "user" ? "👤" : "🤖"}</span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] order-1">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 mr-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 order-2 mr-2">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <Button variant="ghost" size="sm" className="mb-2">
                🎤
              </Button>
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your farming question..."
                  className="min-h-[44px] resize-none"
                />
              </div>
              <Button variant="ghost" size="sm" className="mb-2">
                📷
              </Button>
              <Button variant="ghost" size="sm" className="mb-2">
                📎
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="mb-2 bg-primary hover:bg-primary/90"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
