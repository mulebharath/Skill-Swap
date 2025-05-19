"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Phone, Video, Info, MoreVertical, ImageIcon, Paperclip, Smile } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "",
      status: "online",
    },
    lastMessage: "When would you like to schedule our next JavaScript session?",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "",
      status: "offline",
    },
    lastMessage: "I really enjoyed our photography lesson yesterday!",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    user: {
      name: "Miguel Rodriguez",
      avatar: "",
      status: "online",
    },
    lastMessage: "¡Hola! ¿Cómo estás? Ready for our Spanish practice?",
    timestamp: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    user: {
      name: "Emma Chen",
      avatar: "",
      status: "offline",
    },
    lastMessage: "Let me know if you have any questions about the yoga poses we practiced.",
    timestamp: "Monday",
    unread: false,
  },
  {
    id: 5,
    user: {
      name: "David Kim",
      avatar: "",
      status: "online",
    },
    lastMessage: "I'm available for our piano lesson tomorrow at 3 PM.",
    timestamp: "Tuesday",
    unread: false,
  },
  {
    id: 6,
    user: {
      name: "Priya Patel",
      avatar: "",
      status: "offline",
    },
    lastMessage: "Here's the Python code example we discussed.",
    timestamp: "Last week",
    unread: false,
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    sender: "Alex Johnson",
    content: "Hey there! I saw you're interested in learning JavaScript.",
    timestamp: "10:15 AM",
    isSelf: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Yes, I've been trying to learn for a few weeks now but getting stuck with async functions.",
    timestamp: "10:18 AM",
    isSelf: true,
  },
  {
    id: 3,
    sender: "Alex Johnson",
    content: "Async functions can be tricky! Would you like to schedule a session to go over them?",
    timestamp: "10:20 AM",
    isSelf: false,
  },
  {
    id: 4,
    sender: "You",
    content: "That would be great! When are you available?",
    timestamp: "10:25 AM",
    isSelf: true,
  },
  {
    id: 5,
    sender: "Alex Johnson",
    content: "When would you like to schedule our next JavaScript session?",
    timestamp: "10:30 AM",
    isSelf: false,
  },
]

export default function MessagesPage() {
  const { toast } = useToast()
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search term
  const filteredConversations = mockConversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (messages[messages.length - 1].isSelf) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
        // Simulate response
        if (Math.random() > 0.5) {
          const responses = [
            "That sounds good!",
            "I'm available tomorrow afternoon.",
            "Let me check my schedule and get back to you.",
            "Great! Looking forward to our session.",
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              sender: selectedConversation.user.name,
              content: randomResponse,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isSelf: false,
            },
          ])
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [messages, selectedConversation.user.name])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isSelf: true,
      }

      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Chat with your skill exchange partners</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="px-4 pt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(conversation.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user.status === "online" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.user.name}</p>
                        <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {filteredConversations.length === 0 && (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        <Card className="md:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(selectedConversation.user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedConversation.user.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${selectedConversation.user.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                  ></span>
                  {selectedConversation.user.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" title="Audio Call">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Video Call">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Info">
                <Info className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="More Options">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}>
                  {!message.isSelf && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(message.sender)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isSelf ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">{message.timestamp}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(selectedConversation.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="icon" title="Attach File">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" title="Attach Image">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" title="Emoji">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
