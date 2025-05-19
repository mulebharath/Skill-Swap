"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Check, MessageSquare, X } from "lucide-react"

// Mock data for matches
const mockPendingMatches = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "",
    },
    canTeach: ["JavaScript", "React", "Node.js"],
    wantsToLearn: ["Photography", "Spanish"],
    matchReason: "You can teach Photography, they can teach JavaScript",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "",
    },
    canTeach: ["Photography", "Adobe Photoshop"],
    wantsToLearn: ["Web Development", "UI Design"],
    matchReason: "You can teach Web Development, they can teach Photography",
  },
  {
    id: 3,
    user: {
      name: "Miguel Rodriguez",
      avatar: "",
    },
    canTeach: ["Spanish", "Portuguese"],
    wantsToLearn: ["Piano", "Guitar"],
    matchReason: "You can teach Guitar, they can teach Spanish",
  },
]

const mockAcceptedMatches = [
  {
    id: 4,
    user: {
      name: "Emma Chen",
      avatar: "",
    },
    canTeach: ["Yoga", "Meditation"],
    wantsToLearn: ["Data Science", "Machine Learning"],
    matchReason: "You can teach Data Science, they can teach Yoga",
    lastActive: "2 days ago",
  },
  {
    id: 5,
    user: {
      name: "David Kim",
      avatar: "",
    },
    canTeach: ["Piano", "Music Theory"],
    wantsToLearn: ["Spanish", "French"],
    matchReason: "You can teach Spanish, they can teach Piano",
    lastActive: "5 hours ago",
  },
]

export default function MatchesPage() {
  const { toast } = useToast()
  const [pendingMatches, setPendingMatches] = useState(mockPendingMatches)
  const [acceptedMatches, setAcceptedMatches] = useState(mockAcceptedMatches)

  const handleAccept = (matchId: number) => {
    const match = pendingMatches.find((m) => m.id === matchId)
    if (match) {
      setPendingMatches(pendingMatches.filter((m) => m.id !== matchId))
      setAcceptedMatches([...acceptedMatches, { ...match, lastActive: "Just now" }])

      toast({
        title: "Match Accepted",
        description: `You've connected with ${match.user.name}. You can now message each other.`,
      })
    }
  }

  const handleReject = (matchId: number) => {
    setPendingMatches(pendingMatches.filter((m) => m.id !== matchId))

    toast({
      title: "Match Declined",
      description: "The match request has been declined.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-muted-foreground">Connect with people who match your skills</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Matches
            {pendingMatches.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingMatches.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted Matches
            {acceptedMatches.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {acceptedMatches.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingMatches.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No pending matches at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {match.user.name.charAt(0)}
                      </div>
                      <CardTitle className="text-lg">{match.user.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-2">{match.matchReason}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Can teach:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.canTeach.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Wants to learn:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.wantsToLearn.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleAccept(match.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => handleReject(match.id)}>
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedMatches.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">No accepted matches yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {acceptedMatches.map((match) => (
                <Card key={match.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {match.user.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{match.user.name}</CardTitle>
                        <CardDescription>Active {match.lastActive}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Can teach:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.canTeach.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Wants to learn:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.wantsToLearn.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{match.matchReason}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
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
