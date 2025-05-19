"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertTriangle,
  Eye,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Search,
  Shield,
  Star,
  Trash,
  User,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data for reported content
const mockReportedContent = [
  {
    id: 1,
    type: "user",
    reportedUser: {
      id: 101,
      name: "John Smith",
      email: "john.smith@example.com",
    },
    reportedBy: {
      id: 102,
      name: "Emma Johnson",
    },
    reason: "Inappropriate behavior during session",
    details: "User was rude and unprofessional during our JavaScript tutoring session.",
    status: "pending",
    date: "2023-05-05",
  },
  {
    id: 2,
    type: "review",
    reviewContent: "This teacher is terrible and doesn't know anything about photography!",
    reviewFor: {
      id: 103,
      name: "Sarah Williams",
    },
    reviewBy: {
      id: 104,
      name: "Michael Brown",
    },
    reportedBy: {
      id: 103,
      name: "Sarah Williams",
    },
    reason: "Abusive review",
    details: "This review is unfair and contains personal attacks rather than constructive feedback.",
    status: "pending",
    date: "2023-05-04",
  },
  {
    id: 3,
    type: "message",
    messageContent: "Hey, can we take this conversation off the platform? Here's my personal contact...",
    messageSender: {
      id: 105,
      name: "David Lee",
    },
    messageReceiver: {
      id: 106,
      name: "Lisa Chen",
    },
    reportedBy: {
      id: 106,
      name: "Lisa Chen",
    },
    reason: "Attempting to circumvent platform",
    details: "User is trying to take communication off-platform to avoid fees or monitoring.",
    status: "pending",
    date: "2023-05-03",
  },
  {
    id: 4,
    type: "user",
    reportedUser: {
      id: 107,
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
    },
    reportedBy: {
      id: 108,
      name: "Jennifer Garcia",
    },
    reason: "Fake profile",
    details: "This user appears to be using fake credentials and stock photos.",
    status: "resolved",
    resolution: "warning",
    date: "2023-05-01",
  },
  {
    id: 5,
    type: "review",
    reviewContent: "Worst experience ever. Complete waste of time and money.",
    reviewFor: {
      id: 109,
      name: "Thomas Wilson",
    },
    reviewBy: {
      id: 110,
      name: "Amanda Martinez",
    },
    reportedBy: {
      id: 109,
      name: "Thomas Wilson",
    },
    reason: "Misleading review",
    details: "This review is from someone who never actually attended a session with me.",
    status: "resolved",
    resolution: "removed",
    date: "2023-04-28",
  },
]

export default function ContentModerationPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false)
  const [resolution, setResolution] = useState("warning")
  const [resolutionNote, setResolutionNote] = useState("")

  // Filter reports based on search term and filters
  const filteredReports = mockReportedContent.filter((report) => {
    const matchesSearch =
      searchTerm === "" ||
      (report.type === "user" && report.reportedUser.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.type === "review" && report.reviewContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.type === "message" && report.messageContent.toLowerCase().includes(searchTerm.toLowerCase())) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "" || report.type === typeFilter
    const matchesStatus = statusFilter === "" || report.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleResolveReport = () => {
    setIsResolveDialogOpen(false)
    toast({
      title: "Report Resolved",
      description: `The report has been resolved with action: ${resolution}.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        )
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>
      case "dismissed":
        return <Badge variant="secondary">Dismissed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="h-4 w-4" />
      case "review":
        return <Star className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "user":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <User className="h-3 w-3" /> User
          </Badge>
        )
      case "review":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" /> Review
          </Badge>
        )
      case "message":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" /> Message
          </Badge>
        )
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Moderation</h1>
          <p className="text-muted-foreground">Review and moderate reported content</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reported Content</CardTitle>
          <CardDescription>Review and take action on reported content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="message">Message</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Reported Content</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{getTypeBadge(report.type)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {report.type === "user"
                                ? report.reportedUser.name.charAt(0)
                                : report.type === "review"
                                  ? report.reviewBy.name.charAt(0)
                                  : report.messageSender.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {report.type === "user"
                                ? report.reportedUser.name
                                : report.type === "review"
                                  ? `Review by ${report.reviewBy.name}`
                                  : `Message from ${report.messageSender.name}`}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {report.type === "user"
                                ? report.details
                                : report.type === "review"
                                  ? report.reviewContent
                                  : report.messageContent}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedReport(report)
                                setIsViewDialogOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {report.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedReport(report)
                                    setResolution("warning")
                                    setIsResolveDialogOpen(true)
                                  }}
                                >
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  Issue Warning
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedReport(report)
                                    setResolution("removed")
                                    setIsResolveDialogOpen(true)
                                  }}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Remove Content
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedReport(report)
                                    setResolution("ban")
                                    setIsResolveDialogOpen(true)
                                  }}
                                >
                                  <Shield className="mr-2 h-4 w-4" />
                                  Ban User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedReport(report)
                                    setResolution("dismiss")
                                    setIsResolveDialogOpen(true)
                                  }}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Dismiss Report
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredReports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No reports found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Report Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>Detailed information about the reported content.</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {getTypeIcon(selectedReport.type)}
                </div>
                <div>
                  <div className="font-medium">
                    {selectedReport.type === "user"
                      ? `User Report: ${selectedReport.reportedUser.name}`
                      : selectedReport.type === "review"
                        ? `Review Report: ${selectedReport.reviewBy.name}`
                        : `Message Report: ${selectedReport.messageSender.name}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Reported on {selectedReport.date} • {getStatusBadge(selectedReport.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Reported By</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {selectedReport.reportedBy.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{selectedReport.reportedBy.name}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Reason for Report</h3>
                <div className="rounded-md bg-muted p-3 text-sm">{selectedReport.reason}</div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Details</h3>
                <div className="rounded-md bg-muted p-3 text-sm">{selectedReport.details}</div>
              </div>

              {selectedReport.type === "review" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Review Content</h3>
                  <div className="rounded-md bg-muted p-3 text-sm">{selectedReport.reviewContent}</div>
                </div>
              )}

              {selectedReport.type === "message" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Message Content</h3>
                  <div className="rounded-md bg-muted p-3 text-sm">{selectedReport.messageContent}</div>
                </div>
              )}

              {selectedReport.status === "resolved" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Resolution</h3>
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <Badge className="mb-2">{selectedReport.resolution}</Badge>
                    <p>{selectedReport.resolutionNote || "No additional notes provided."}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            {selectedReport && selectedReport.status === "pending" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  setIsResolveDialogOpen(true)
                }}
              >
                Take Action
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Report Dialog */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Report</DialogTitle>
            <DialogDescription>Take action on this reported content.</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Action</h3>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warning">Issue Warning</SelectItem>
                    <SelectItem value="removed">Remove Content</SelectItem>
                    <SelectItem value="ban">Ban User</SelectItem>
                    <SelectItem value="dismiss">Dismiss Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notes</h3>
                <Textarea
                  placeholder="Add notes about this resolution (optional)"
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                />
              </div>

              {resolution === "ban" && (
                <div className="rounded-md bg-destructive/10 p-4 text-destructive">
                  <p className="text-sm">
                    <AlertTriangle className="h-4 w-4 inline-block mr-2" />
                    This will permanently ban the user from the platform. This action cannot be undone.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolveReport} variant={resolution === "ban" ? "destructive" : "default"}>
              {resolution === "warning"
                ? "Issue Warning"
                : resolution === "removed"
                  ? "Remove Content"
                  : resolution === "ban"
                    ? "Ban User"
                    : "Dismiss Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
