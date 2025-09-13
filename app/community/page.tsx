"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthGuard } from "@/components/ui/auth-guard"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Post {
  id: string
  type: "success" | "question" | "tip"
  author: string
  location: string
  title: string
  content: string
  image?: string
  likes: number
  comments: number
  timeAgo: string
  tags: string[]
  isExpert?: boolean
}

interface Question {
  id: string
  author: string
  question: string
  tags: string[]
  answers: number
  views: number
  timeAgo: string
  isAnswered: boolean
}

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState<"feed" | "questions" | "experts">("feed")
  const [showNewPost, setShowNewPost] = useState(false)

  const posts: Post[] = [
    {
      id: "1",
      type: "success",
      author: "Ravi Kumar",
      location: "Kollam",
      title: "Achieved 40% yield increase with AI guidance!",
      content:
        "Following the AI's advice for fertilizer timing and pest management helped me achieve the best harvest in 5 years. My rice yield increased from 3.2 tons to 4.5 tons per hectare!",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago",
      tags: ["rice", "yield", "success"],
    },
    {
      id: "2",
      type: "success",
      author: "Maya Devi",
      location: "Kottayam",
      title: "Early pest detection saved my entire crop",
      content:
        "The plant scanner detected brown plant hopper infestation 2 weeks before I would have noticed. Quick treatment saved my entire 3-acre rice field. Thank you Krishi Sakhi!",
      likes: 31,
      comments: 12,
      timeAgo: "5 hours ago",
      tags: ["pest control", "rice", "early detection"],
    },
    {
      id: "3",
      type: "tip",
      author: "Dr. Priya Nair",
      location: "Agricultural Officer, Wayanad",
      title: "Monsoon preparation checklist for farmers",
      content:
        "With heavy rains expected, here's what every farmer should do: 1) Clear drainage channels 2) Harvest mature crops 3) Store fertilizers in dry places 4) Check irrigation pumps 5) Prepare for pest outbreaks post-rain",
      likes: 45,
      comments: 18,
      timeAgo: "1 day ago",
      tags: ["monsoon", "preparation", "tips"],
      isExpert: true,
    },
    {
      id: "4",
      type: "question",
      author: "Suresh M",
      location: "Thrissur",
      title: "Best organic fertilizer for coconut trees?",
      content:
        "My coconut trees are 8 years old and I want to switch to organic fertilizers. What are the best options available in Kerala? Looking for cost-effective solutions.",
      likes: 12,
      comments: 6,
      timeAgo: "3 hours ago",
      tags: ["coconut", "organic", "fertilizer"],
    },
  ]

  const questions: Question[] = [
    {
      id: "1",
      author: "Suresh M",
      question: "Best time to plant coconut saplings in monsoon season?",
      tags: ["coconut", "planting", "monsoon"],
      answers: 3,
      views: 45,
      timeAgo: "30 minutes ago",
      isAnswered: true,
    },
    {
      id: "2",
      author: "Lakshmi R",
      question: "How to control leaf curl disease in chili plants organically?",
      tags: ["chili", "disease", "organic"],
      answers: 1,
      views: 23,
      timeAgo: "1 hour ago",
      isAnswered: false,
    },
    {
      id: "3",
      author: "Rajesh K",
      question: "Market price prediction for black pepper this season?",
      tags: ["black pepper", "market", "price"],
      answers: 5,
      views: 78,
      timeAgo: "2 hours ago",
      isAnswered: true,
    },
  ]

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "question":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "tip":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return "🏆"
      case "question":
        return "❓"
      case "tip":
        return "💡"
      default:
        return "📝"
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
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">👥</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">Community Hub</h1>
                  <p className="text-xs text-muted-foreground">Connect with fellow farmers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  🔍
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setShowNewPost(true)}>
                  ✏️ Post
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
                variant={selectedTab === "feed" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab("feed")}
                className="flex-1"
              >
                📰 Feed
              </Button>
              <Button
                variant={selectedTab === "questions" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab("questions")}
                className="flex-1"
              >
                ❓ Q&A
              </Button>
              <Button
                variant={selectedTab === "experts" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab("experts")}
                className="flex-1"
              >
                👨‍🌾 Experts
              </Button>
            </div>

            {selectedTab === "feed" && (
              <>
                {/* Community Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-green-600">2,847</div>
                      <div className="text-sm text-muted-foreground">Active Farmers</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600">456</div>
                      <div className="text-sm text-muted-foreground">Daily Posts</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-orange-600">89%</div>
                      <div className="text-sm text-muted-foreground">Questions Answered</div>
                    </CardContent>
                  </Card>
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-purple-600">23</div>
                      <div className="text-sm text-muted-foreground">Expert Officers</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Post Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">👤</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{post.author}</span>
                                  {post.isExpert && (
                                    <Badge className="bg-blue-100 text-blue-800 text-xs">✅ Expert</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {post.location} • {post.timeAgo}
                                </div>
                              </div>
                            </div>
                            <Badge className={getPostTypeColor(post.type)}>
                              {getPostTypeIcon(post.type)} {post.type}
                            </Badge>
                          </div>

                          {/* Post Content */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-sm leading-relaxed">{post.content}</p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Post Actions */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                👍 {post.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                💬 {post.comments}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                📤 Share
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm">
                              ⋯
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {selectedTab === "questions" && (
              <>
                {/* Ask Question Button */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-4xl">❓</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Have a Farming Question?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get answers from experienced farmers and agricultural experts
                      </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">❓ Ask Question</Button>
                  </CardContent>
                </Card>

                {/* Questions List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Questions</h3>
                  {questions.map((question) => (
                    <Card key={question.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium mb-2">{question.question}</h4>
                              <div className="text-sm text-muted-foreground mb-3">
                                Asked by {question.author} • {question.timeAgo}
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {question.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {question.isAnswered && <Badge className="bg-green-100 text-green-800">✅ Answered</Badge>}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>💡 {question.answers} answers</span>
                              <span>👁️ {question.views} views</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Answer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {selectedTab === "experts" && (
              <>
                {/* Expert Directory */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">👨‍🌾 Agricultural Experts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Dr. Priya Nair",
                        role: "Agricultural Officer",
                        location: "Wayanad",
                        speciality: "Rice & Coconut",
                        rating: 4.9,
                      },
                      {
                        name: "Prof. Rajesh Kumar",
                        role: "Soil Scientist",
                        location: "Thrissur",
                        speciality: "Soil Health",
                        rating: 4.8,
                      },
                      {
                        name: "Dr. Maya Menon",
                        role: "Plant Pathologist",
                        location: "Kochi",
                        speciality: "Disease Control",
                        rating: 4.9,
                      },
                      {
                        name: "Sunil Varma",
                        role: "Extension Officer",
                        location: "Kollam",
                        speciality: "Organic Farming",
                        rating: 4.7,
                      },
                    ].map((expert, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white">👨‍🌾</span>
                          </div>
                          <div>
                            <div className="font-medium">{expert.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {expert.role} • {expert.location}
                            </div>
                            <div className="text-sm text-primary">Speciality: {expert.speciality}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-medium">{expert.rating}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            💬 Consult
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Expert Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">💡 Expert Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">🌾 Rice Farming Tip</h4>
                      <p className="text-sm text-green-800">
                        "Apply silicon-based fertilizers during the tillering stage to strengthen plant stems and
                        improve disease resistance." - Dr. Priya Nair
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">🥥 Coconut Care</h4>
                      <p className="text-sm text-blue-800">
                        "Regular application of organic matter around the base improves water retention and nutrient
                        availability." - Prof. Rajesh Kumar
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Create New Post</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowNewPost(false)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Post Type</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      🏆 Success
                    </Button>
                    <Button variant="outline" size="sm">
                      ❓ Question
                    </Button>
                    <Button variant="outline" size="sm">
                      💡 Tip
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="What's your post about?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea placeholder="Share your experience, ask a question, or give a tip..." rows={4} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input placeholder="rice, coconut, pest control..." />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">📝 Post</Button>
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
