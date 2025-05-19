"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X, Camera, Calendar, Clock, Check, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [teachSkills, setTeachSkills] = useState<string[]>(["Photography", "Spanish", "Guitar"])
  const [learnSkills, setLearnSkills] = useState<string[]>(["JavaScript", "Yoga"])
  const [newTeachSkill, setNewTeachSkill] = useState("")
  const [newLearnSkill, setNewLearnSkill] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      })
    }, 1500)
  }

  const addTeachSkill = () => {
    if (newTeachSkill && !teachSkills.includes(newTeachSkill)) {
      setTeachSkills([...teachSkills, newTeachSkill])
      setNewTeachSkill("")
    } else if (teachSkills.includes(newTeachSkill)) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your teaching list.",
        variant: "destructive",
      })
    }
  }

  const removeTeachSkill = (skill: string) => {
    setTeachSkills(teachSkills.filter((s) => s !== skill))
  }

  const addLearnSkill = () => {
    if (newLearnSkill && !learnSkills.includes(newLearnSkill)) {
      setLearnSkills([...learnSkills, newLearnSkill])
      setNewLearnSkill("")
    } else if (learnSkills.includes(newLearnSkill)) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your learning list.",
        variant: "destructive",
      })
    }
  }

  const removeLearnSkill = (skill: string) => {
    setLearnSkills(learnSkills.filter((s) => s !== skill))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and skills</p>
        </div>
        <Button onClick={handleSaveProfile} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span> Saving...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Save All Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">JD</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 p-1 rounded-full bg-primary text-primary-foreground cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload profile picture</span>
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">Upload a clear photo to help others recognize you</p>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Button variant="outline" size="sm" onClick={() => setProfileImage(null)}>
                      Remove
                    </Button>
                    <label htmlFor="profile-image-btn">
                      <Button size="sm" asChild>
                        <span>Change Photo</span>
                      </Button>
                    </label>
                    <input
                      id="profile-image-btn"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" defaultValue="john.doe@example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" placeholder="City, Country" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea id="bio" placeholder="Tell others about yourself..." className="col-span-3 min-h-[120px]" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Profile Visibility</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Allow others to view your profile and skills</p>
                    </div>
                    <Switch id="public-profile" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-email">Show Email</Label>
                      <p className="text-sm text-muted-foreground">Display your email address on your public profile</p>
                    </div>
                    <Switch id="show-email" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills You Can Teach</CardTitle>
              <CardDescription>Add skills that you can teach to others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Button onClick={addTeachSkill}>Add</Button>
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
                  <div className="text-center w-full py-8 border rounded-md border-dashed">
                    <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No skills added yet. Add skills that you can teach to others.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills You Want to Learn</CardTitle>
              <CardDescription>Add skills that you want to learn from others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Button onClick={addLearnSkill}>Add</Button>
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
                  <div className="text-center w-full py-8 border rounded-md border-dashed">
                    <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No skills added yet. Add skills that you want to learn from others.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Availability</CardTitle>
              <CardDescription>Set your available time slots for teaching and learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Availability Status</Label>
                    <p className="text-sm text-muted-foreground">Set your current availability for skill exchanges</p>
                  </div>
                  <Select defaultValue="available">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="limited">Limited Availability</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Weekly Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="space-y-2 border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">{day}</Label>
                          <Switch defaultChecked={["Monday", "Wednesday", "Friday"].includes(day)} />
                        </div>
                        <div className="flex gap-2 items-center">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            <Select defaultValue={day === "Monday" ? "9:00" : day === "Wednesday" ? "13:00" : "10:00"}>
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
                            <Select defaultValue={day === "Monday" ? "17:00" : day === "Wednesday" ? "18:00" : "16:00"}>
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
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Session Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Preferred Session Length</Label>
                      </div>
                      <Select defaultValue="60">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="90">1.5 hours</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Format</Label>
                      </div>
                      <Select defaultValue="both">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online Only</SelectItem>
                          <SelectItem value="in-person">In-Person Only</SelectItem>
                          <SelectItem value="both">Both Online & In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
