"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { CalendarClock, Clock, MessageSquare, Video } from "lucide-react"

// Mock data for scheduled sessions
const mockUpcomingSessions = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "",
    },
    skill: "JavaScript Programming",
    role: "learning", // learning or teaching
    date: "2025-05-06",
    time: "10:00 AM - 11:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "",
    },
    skill: "Photography Basics",
    role: "teaching",
    date: "2025-05-08",
    time: "2:00 PM - 3:30 PM",
    status: "confirmed",
  },
  {
    id: 3,
    user: {
      name: "Miguel Rodriguez",
      avatar: "",
    },
    skill: "Spanish Conversation",
    role: "learning",
    date: "2025-05-10",
    time: "6:00 PM - 7:00 PM",
    status: "pending",
  },
]

const mockPastSessions = [
  {
    id: 4,
    user: {
      name: "Emma Chen",
      avatar: "",
    },
    skill: "Yoga Instruction",
    role: "learning",
    date: "2025-05-01",
    time: "9:00 AM - 10:00 AM",
    status: "completed",
    feedback: null,
  },
  {
    id: 5,
    user: {
      name: "David Kim",
      avatar: "",
    },
    skill: "Piano Lessons",
    role: "learning",
    date: "2025-04-28",
    time: "4:00 PM - 5:00 PM",
    status: "completed",
    feedback: {
      rating: 5,
      comment: "Great teacher! Very patient and knowledgeable.",
    },
  },
]

export default function SchedulePage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleScheduleSession = () => {
    toast({
      title: "Session Scheduled",
      description: "Your session has been scheduled successfully.",
    })
    setIsDialogOpen(false)
  }

  const handleCancelSession = (sessionId: number) => {
    toast({
      title: "Session Cancelled",
      description: "The session has been cancelled.",
    })
  }

  const handleLeaveFeedback = (sessionId: number) => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">Manage your teaching and learning sessions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view or schedule sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Schedule New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule a Session</DialogTitle>
                  <DialogDescription>Set up a teaching or learning session with a skill partner.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="session-type" className="text-sm font-medium">
                      Session Type
                    </label>
                    <Select>
                      <SelectTrigger id="session-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teaching">Teaching</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="partner" className="text-sm font-medium">
                      Partner
                    </label>
                    <Select>
                      <SelectTrigger id="partner">
                        <SelectValue placeholder="Select partner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alex">Alex Johnson</SelectItem>
                        <SelectItem value="sarah">Sarah Williams</SelectItem>
                        <SelectItem value="miguel">Miguel Rodriguez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="skill" className="text-sm font-medium">
                      Skill
                    </label>
                    <Select>
                      <SelectTrigger id="skill">
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript Programming</SelectItem>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <Select>
                      <SelectTrigger id="date">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="next-week">Next Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="time" className="text-sm font-medium">
                      Time
                    </label>
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9am">9:00 AM - 10:00 AM</SelectItem>
                        <SelectItem value="11am">11:00 AM - 12:00 PM</SelectItem>
                        <SelectItem value="2pm">2:00 PM - 3:00 PM</SelectItem>
                        <SelectItem value="4pm">4:00 PM - 5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleScheduleSession}>Schedule Session</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>Your upcoming and past teaching and learning sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4 mt-4">
                {mockUpcomingSessions.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No upcoming sessions scheduled.</p>
                ) : (
                  mockUpcomingSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {session.user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{session.skill}</p>
                                <p className="text-sm text-muted-foreground">with {session.user.name}</p>
                              </div>
                              <Badge variant={session.status === "pending" ? "outline" : "secondary"}>
                                {session.status === "pending" ? "Pending" : "Confirmed"}
                              </Badge>
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarClock className="mr-1 h-4 w-4" />
                                {session.date}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                {session.time}
                              </div>
                              <Badge>{session.role === "teaching" ? "Teaching" : "Learning"}</Badge>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" variant="outline">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                              </Button>
                              {session.status === "confirmed" && (
                                <Button size="sm">
                                  <Video className="mr-2 h-4 w-4" />
                                  Join Session
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="ml-auto text-destructive hover:text-destructive"
                                onClick={() => handleCancelSession(session.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4 mt-4">
                {mockPastSessions.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No past sessions.</p>
                ) : (
                  mockPastSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {session.user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{session.skill}</p>
                                <p className="text-sm text-muted-foreground">with {session.user.name}</p>
                              </div>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarClock className="mr-1 h-4 w-4" />
                                {session.date}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                {session.time}
                              </div>
                              <Badge>{session.role === "teaching" ? "Teaching" : "Learning"}</Badge>
                            </div>
                            {session.feedback ? (
                              <div className="mt-4 p-3 bg-muted rounded-md">
                                <div className="flex items-center">
                                  <p className="text-sm font-medium">Your feedback:</p>
                                  <div className="ml-2 flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span
                                        key={i}
                                        className={`text-sm ${i < session.feedback.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">"{session.feedback.comment}"</p>
                              </div>
                            ) : (
                              <div className="mt-4">
                                <Button size="sm" onClick={() => handleLeaveFeedback(session.id)}>
                                  Leave Feedback
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
