"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Plus, Trash } from "lucide-react"

// Mock data for skills
const mockTeachSkills = [
  {
    id: 1,
    title: "Photography Basics",
    category: "Arts",
    level: "Intermediate",
    description: "Digital photography fundamentals, composition techniques, and basic editing.",
    tags: ["Photography", "Arts", "Creative"],
  },
  {
    id: 2,
    title: "Spanish Conversation",
    category: "Languages",
    level: "Advanced",
    description: "Conversational Spanish with focus on Latin American dialects and everyday phrases.",
    tags: ["Languages", "Spanish", "Communication"],
  },
  {
    id: 3,
    title: "Guitar for Beginners",
    category: "Music",
    level: "Beginner",
    description: "Learn basic chords, strumming patterns, and simple songs on acoustic guitar.",
    tags: ["Music", "Instrument", "Guitar"],
  },
]

const mockLearnSkills = [
  {
    id: 1,
    title: "JavaScript Programming",
    category: "Programming",
    level: "Beginner",
    description: "Looking to learn JavaScript basics for web development.",
    tags: ["Programming", "Web Development", "Frontend"],
  },
  {
    id: 2,
    title: "Yoga",
    category: "Fitness",
    level: "Beginner",
    description: "Interested in learning yoga poses and breathing techniques for stress relief.",
    tags: ["Fitness", "Wellness", "Health"],
  },
]

export default function MySkillsPage() {
  const { toast } = useToast()
  const [teachSkills, setTeachSkills] = useState(mockTeachSkills)
  const [learnSkills, setLearnSkills] = useState(mockLearnSkills)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<any>(null)
  const [skillType, setSkillType] = useState<"teach" | "learn">("teach")

  const handleAddSkill = () => {
    toast({
      title: "Skill Added",
      description: "Your new skill has been added successfully.",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditSkill = () => {
    toast({
      title: "Skill Updated",
      description: "Your skill has been updated successfully.",
    })
    setIsEditDialogOpen(false)
  }

  const handleDeleteSkill = (id: number, type: "teach" | "learn") => {
    if (type === "teach") {
      setTeachSkills(teachSkills.filter((skill) => skill.id !== id))
    } else {
      setLearnSkills(learnSkills.filter((skill) => skill.id !== id))
    }

    toast({
      title: "Skill Deleted",
      description: "Your skill has been deleted successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Skills</h1>
        <p className="text-muted-foreground">Manage the skills you can teach and want to learn</p>
      </div>

      <Tabs defaultValue="teach">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="teach">Skills I Can Teach</TabsTrigger>
            <TabsTrigger value="learn">Skills I Want to Learn</TabsTrigger>
          </TabsList>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSkillType("teach")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
                <DialogDescription>Add a skill that you can teach or want to learn.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="skill-type">Skill Type</Label>
                  <Select value={skillType} onValueChange={(value: "teach" | "learn") => setSkillType(value)}>
                    <SelectTrigger id="skill-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teach">I can teach this</SelectItem>
                      <SelectItem value="learn">I want to learn this</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-title">Skill Title</Label>
                  <Input id="skill-title" placeholder="Enter skill title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-category">Category</Label>
                  <Select>
                    <SelectTrigger id="skill-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-level">Level</Label>
                  <Select>
                    <SelectTrigger id="skill-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-description">Description</Label>
                  <Textarea
                    id="skill-description"
                    placeholder="Describe the skill and what you can teach or want to learn"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skill-tags">Tags (comma separated)</Label>
                  <Input id="skill-tags" placeholder="e.g., Programming, Web, JavaScript" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddSkill}>Add Skill</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="teach" className="space-y-4 mt-4">
          {teachSkills.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">You haven't added any skills you can teach yet.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSkillType("teach")
                    setIsAddDialogOpen(true)
                  }}
                >
                  Add your first teaching skill
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teachSkills.map((skill) => (
                <Card key={skill.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{skill.title}</CardTitle>
                      <Badge>{skill.level}</Badge>
                    </div>
                    <CardDescription>{skill.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentSkill(skill)
                            setSkillType("teach")
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Skill</DialogTitle>
                          <DialogDescription>Update your skill information.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-skill-title">Skill Title</Label>
                            <Input id="edit-skill-title" defaultValue={currentSkill?.title || ""} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-skill-category">Category</Label>
                            <Select defaultValue={currentSkill?.category || ""}>
                              <SelectTrigger id="edit-skill-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="programming">Programming</SelectItem>
                                <SelectItem value="arts">Arts</SelectItem>
                                <SelectItem value="languages">Languages</SelectItem>
                                <SelectItem value="fitness">Fitness</SelectItem>
                                <SelectItem value="music">Music</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-skill-level">Level</Label>
                            <Select defaultValue={currentSkill?.level || ""}>
                              <SelectTrigger id="edit-skill-level">
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-skill-description">Description</Label>
                            <Textarea id="edit-skill-description" defaultValue={currentSkill?.description || ""} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-skill-tags">Tags (comma separated)</Label>
                            <Input id="edit-skill-tags" defaultValue={currentSkill?.tags.join(", ") || ""} />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleEditSkill}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteSkill(skill.id, "teach")}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="learn" className="space-y-4 mt-4">
          {learnSkills.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">You haven't added any skills you want to learn yet.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSkillType("learn")
                    setIsAddDialogOpen(true)
                  }}
                >
                  Add your first learning skill
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {learnSkills.map((skill) => (
                <Card key={skill.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{skill.title}</CardTitle>
                      <Badge>{skill.level}</Badge>
                    </div>
                    <CardDescription>{skill.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">{skill.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentSkill(skill)
                        setSkillType("learn")
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteSkill(skill.id, "learn")}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
