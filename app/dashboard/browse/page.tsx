"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Filter, Search, Star, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for skills
const mockSkills = [
  {
    id: 1,
    title: "JavaScript Programming",
    category: "Programming",
    user: "Alex Johnson",
    level: "Intermediate",
    description: "Learn JavaScript fundamentals, DOM manipulation, and modern ES6+ features.",
    tags: ["Programming", "Web Development", "Frontend"],
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    title: "Digital Photography",
    category: "Arts",
    user: "Sarah Williams",
    level: "Beginner",
    description: "Master the basics of digital photography, composition, and editing.",
    tags: ["Photography", "Arts", "Creative"],
    rating: 4.5,
    reviews: 18,
  },
  {
    id: 3,
    title: "Spanish Language",
    category: "Languages",
    user: "Miguel Rodriguez",
    level: "Advanced",
    description: "Conversational Spanish with focus on Latin American dialects.",
    tags: ["Languages", "Spanish", "Communication"],
    rating: 4.9,
    reviews: 32,
  },
  {
    id: 4,
    title: "Yoga Instruction",
    category: "Fitness",
    user: "Emma Chen",
    level: "Intermediate",
    description: "Learn proper yoga poses, breathing techniques, and meditation practices.",
    tags: ["Fitness", "Wellness", "Health"],
    rating: 4.7,
    reviews: 41,
  },
  {
    id: 5,
    title: "Piano Lessons",
    category: "Music",
    user: "David Kim",
    level: "Beginner",
    description: "Learn to play piano from basics to simple classical pieces.",
    tags: ["Music", "Instrument", "Arts"],
    rating: 4.6,
    reviews: 15,
  },
  {
    id: 6,
    title: "Data Science with Python",
    category: "Programming",
    user: "Priya Patel",
    level: "Advanced",
    description: "Data analysis, visualization, and machine learning with Python.",
    tags: ["Programming", "Data Science", "Analytics"],
    rating: 4.9,
    reviews: 29,
  },
  {
    id: 7,
    title: "French Language",
    category: "Languages",
    user: "Jean Dupont",
    level: "Beginner",
    description: "Learn French basics, pronunciation, and everyday phrases.",
    tags: ["Languages", "French", "Communication"],
    rating: 4.4,
    reviews: 12,
  },
  {
    id: 8,
    title: "Graphic Design",
    category: "Arts",
    user: "Lisa Chen",
    level: "Intermediate",
    description: "Master Adobe Photoshop, Illustrator, and design principles.",
    tags: ["Design", "Creative", "Software"],
    rating: 4.7,
    reviews: 22,
  },
]

export default function BrowseSkillsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [levelFilter, setLevelFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter skills based on search term and filters
  const filteredSkills = mockSkills.filter((skill) => {
    const matchesSearch =
      searchTerm === "" ||
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "" || skill.category === categoryFilter
    const matchesLevel = levelFilter === "" || skill.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  const handleConnect = (skillId: number) => {
    toast({
      title: "Connection Request Sent",
      description: "Your request to connect has been sent to the skill provider.",
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("")
    setLevelFilter("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Skills</h1>
          <p className="text-muted-foreground">Discover skills you can learn from others</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find the perfect skill to learn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search skills..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchTerm || categoryFilter || levelFilter) && (
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Filter className="h-3 w-3" /> Active filters
              </Badge>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                </Badge>
              )}
              {categoryFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categoryFilter}
                </Badge>
              )}
              {levelFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Level: {levelFilter}
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="h-3 w-full bg-muted" />
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="h-2 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">{skill.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {skill.user}
                    </CardDescription>
                  </div>
                  <Badge>{skill.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{skill.category}</Badge>
                  <div className="flex items-center ml-auto text-sm">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="font-medium">{skill.rating}</span>
                    <span className="text-muted-foreground ml-1">({skill.reviews})</span>
                  </div>
                </div>
                <p className="text-sm line-clamp-3">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleConnect(skill.id)}>
                  Connect & Learn
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No skills found</h3>
              <p className="text-muted-foreground mb-4">No skills found matching your criteria.</p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredSkills.map((skill) => (
                <div key={skill.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{skill.title}</h3>
                        <Badge>{skill.level}</Badge>
                        <Badge variant="outline">{skill.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{skill.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-sm flex items-center gap-1">
                          <User className="h-3 w-3" /> {skill.user}
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span>{skill.rating}</span>
                          <span className="text-muted-foreground">({skill.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleConnect(skill.id)}>Connect</Button>
                  </div>
                </div>
              ))}

              {filteredSkills.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No skills found</h3>
                  <p className="text-muted-foreground mb-4">No skills found matching your criteria.</p>
                  <Button onClick={clearFilters}>Clear filters</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
