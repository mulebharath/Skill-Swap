import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, ChevronRight, MessageSquare, TrendingUp, Users } from "lucide-react"
import { SkillMatchChart } from "@/components/skill-match-chart"
import { RecentActivityList } from "@/components/recent-activity-list"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your skill exchanges.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/browse">
            <Button variant="outline">Browse Skills</Button>
          </Link>
          <Link href="/dashboard/my-skills">
            <Button>Add New Skill</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Pending Matches</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">People waiting to connect with you</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/matches" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View all matches <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Unread Messages</div>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">New messages from your connections</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400/40 via-blue-400 to-blue-400/40"></div>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/messages" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View all messages <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Upcoming Sessions</div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Sessions scheduled this week</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400/40 via-orange-400 to-orange-400/40"></div>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/schedule" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View schedule <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">My Skills</div>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-xs">
                Teaching: <span className="font-medium">3</span>
              </div>
              <div className="text-xs">
                Learning: <span className="font-medium">4</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400/40 via-purple-400 to-purple-400/40"></div>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/dashboard/my-skills" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Manage skills <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Skill Exchange Activity</CardTitle>
            <CardDescription>Your teaching and learning progress over time</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <SkillMatchChart />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Exchange Progress</CardTitle>
            <CardDescription>Your skill exchange balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Teaching Hours</div>
                <div className="text-sm text-muted-foreground">8 / 10 hours</div>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Learning Hours</div>
                <div className="text-sm text-muted-foreground">6 / 10 hours</div>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Skill Matches</div>
                <div className="text-sm text-muted-foreground">5 / 10 matches</div>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="pt-4 flex justify-between items-center">
              <div className="text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Exchange Balance</span>
              </div>
              <div className="text-sm font-medium">+2 hours</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matches">Recent Matches</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>People who match with your skills</CardTitle>
              <CardDescription>Connect with these users to start exchanging skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/60 to-primary flex items-center justify-center text-primary-foreground font-medium">
                      U{i}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-medium">User Name {i}</p>
                          <p className="text-sm text-muted-foreground">
                            Can teach: <span className="text-foreground font-medium">Skill {i}</span> • Wants to learn:{" "}
                            <span className="text-foreground font-medium">Your Skill {i}</span>
                          </p>
                        </div>
                        <Button size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/matches">
                <Button variant="outline" size="sm">
                  View all matches
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Your recent activity</CardTitle>
              <CardDescription>Latest interactions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivityList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
