import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, UserPlus, UserCheck, Flag, Star, Shield } from "lucide-react"

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "user_registered",
    user: {
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
    },
    details: "New user registered",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    type: "user_approved",
    user: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
    },
    details: "User account approved",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    type: "content_reported",
    user: {
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
    },
    details: "Review reported for inappropriate content",
    timestamp: "2 hours ago",
  },
  {
    id: 4,
    type: "user_suspended",
    user: {
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
    },
    details: "User suspended for violating terms of service",
    timestamp: "3 hours ago",
  },
  {
    id: 5,
    type: "admin_action",
    user: {
      name: "Admin User",
      email: "admin@skillswap.com",
    },
    details: "Content moderation settings updated",
    timestamp: "5 hours ago",
  },
  {
    id: 6,
    type: "review_removed",
    user: {
      name: "Amanda Martinez",
      email: "amanda.martinez@example.com",
    },
    details: "Review removed for violating community guidelines",
    timestamp: "6 hours ago",
  },
  {
    id: 7,
    type: "user_registered",
    user: {
      name: "David Kim",
      email: "david.kim@example.com",
    },
    details: "New user registered",
    timestamp: "8 hours ago",
  },
]

export function RecentActivityTable() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registered":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      case "user_approved":
        return <UserCheck className="h-4 w-4 text-green-500" />
      case "content_reported":
        return <Flag className="h-4 w-4 text-red-500" />
      case "user_suspended":
        return (
          <Badge variant="destructive" className="px-1 py-0 text-xs">
            Suspended
          </Badge>
        )
      case "admin_action":
        return <Shield className="h-4 w-4 text-purple-500" />
      case "review_removed":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentActivity.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{activity.user.name}</div>
                  <div className="text-xs text-muted-foreground">{activity.user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getActivityIcon(activity.type)}
                <span>{activity.details}</span>
              </div>
            </TableCell>
            <TableCell>{activity.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
