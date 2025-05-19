import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Users, UserCheck, UserPlus, UserX } from "lucide-react"

export function UserStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">1,248</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">12%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-3xl font-bold">876</p>
            </div>
            <div className="rounded-full bg-green-500/10 p-3 text-green-500">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">8%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Users</p>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
              <UserPlus className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            <span className="font-medium text-green-500">24%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Suspended Users</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="rounded-full bg-red-500/10 p-3 text-red-500">
              <UserX className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span className="font-medium">0.9%</span>
            <span className="ml-1">of total users</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
