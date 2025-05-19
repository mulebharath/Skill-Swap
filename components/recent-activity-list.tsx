import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, ThumbsUp, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "match",
    description: "You matched with Sarah Williams for Photography lessons",
    time: "2 hours ago",
    icon: Users,
  },
  {
    id: 2,
    type: "message",
    description: "Alex Johnson sent you a message about JavaScript lessons",
    time: "5 hours ago",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "session",
    description: "Your Spanish lesson with Miguel Rodriguez is scheduled",
    time: "Yesterday",
    icon: Calendar,
  },
  {
    id: 4,
    type: "feedback",
    description: "Emma Chen gave you a 5-star rating for your Yoga session",
    time: "2 days ago",
    icon: ThumbsUp,
  },
]

export function RecentActivityList() {
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="mt-1 rounded-full p-2 bg-muted">
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{activity.description}</p>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    {activity.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
