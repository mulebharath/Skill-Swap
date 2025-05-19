"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Check, ChevronRight, Loader2, Plus, X } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [teachSkills, setTeachSkills] = useState<string[]>([])
  const [learnSkills, setLearnSkills] = useState<string[]>([])
  const [newTeachSkill, setNewTeachSkill] = useState("")
  const [newLearnSkill, setNewLearnSkill] = useState("")

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile completed",
        description: "Your profile has been set up successfully.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  const addTeachSkill = () => {
    if (newTeachSkill && !teachSkills.includes(newTeachSkill)) {
      setTeachSkills([...teachSkills, newTeachSkill])
      setNewTeachSkill("")
    }
  }

  const removeTeachSkill = (skill: string) => {
    setTeachSkills(teachSkills.filter((s) => s !== skill))
  }

  const addLearnSkill = () => {
    if (newLearnSkill && !learnSkills.includes(newLearnSkill)) {
      setLearnSkills([...learnSkills, newLearnSkill])
      setNewLearnSkill("")
    }
  }

  const removeLearnSkill = (skill: string) => {
    setLearnSkills(learnSkills.filter((s) => s !== skill))
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-8">
      <div className="w-full max-w-[800px] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Complete Your Profile</h1>
          <p className="text-muted-foreground">Let's set up your profile to help you find the perfect skill matches</p>
        </div>

        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step >= i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/20 text-muted-foreground"
                }`}
              >
                {step > i ? <Check className="h-5 w-5" /> : i}
              </div>
              <span className={`text-sm ${step >= i ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {i === 1 ? "Personal Info" : i === 2 ? "Skills" : "Availability"}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell others about yourself, your interests, and experience..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your overall experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleNext}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>Add skills you can teach and want to learn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Skills You Can Teach</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you can teach..."
                    value={newTeachSkill}
                    onChange={(e) => setNewTeachSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTeachSkill()
                      }
                    }}
                  />
                  <Button onClick={addTeachSkill} type="button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {teachSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 py-2 px-3">
                      {skill}
                      <button
                        onClick={() => removeTeachSkill(skill)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                  {teachSkills.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No skills added yet. Add skills that you can teach to others.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Skills You Want to Learn</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you want to learn..."
                    value={newLearnSkill}
                    onChange={(e) => setNewLearnSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addLearnSkill()
                      }
                    }}
                  />
                  <Button onClick={addLearnSkill} type="button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {learnSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 py-2 px-3">
                      {skill}
                      <button
                        onClick={() => removeLearnSkill(skill)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                  {learnSkills.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No skills added yet. Add skills that you want to learn from others.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Availability</CardTitle>
              <CardDescription>Set your available time slots for teaching and learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="weekly">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="space-y-2 border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <Label>{day}</Label>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Start time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, i) => (
                                <SelectItem key={i} value={`${i}:00`}>
                                  {`${i}:00`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="End time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, i) => (
                                <SelectItem key={i} value={`${i}:00`}>
                                  {`${i}:00`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="preferences" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Preferred Session Length</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Session Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online Only</SelectItem>
                          <SelectItem value="in-person">In-Person Only</SelectItem>
                          <SelectItem value="both">Both Online & In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Sessions Per Week</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select maximum sessions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 session</SelectItem>
                          <SelectItem value="2">2 sessions</SelectItem>
                          <SelectItem value="3">3 sessions</SelectItem>
                          <SelectItem value="4">4 sessions</SelectItem>
                          <SelectItem value="5">5+ sessions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleComplete} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Completing...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
