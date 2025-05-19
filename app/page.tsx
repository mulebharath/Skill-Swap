import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Calendar, MessageSquare, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Skill</span>
            <span>Swap</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 md:py-32 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Share Your Skills, Learn Something New</h1>
          <p className="text-xl text-muted-foreground">
            SkillSwap connects people who want to teach and learn from each other. No money involved—just an exchange of
            knowledge and time.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Everything You Need to Exchange Skills</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to find people with complementary skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Smart Matchmaking</h3>
            <p className="text-muted-foreground">
              Our algorithm suggests perfect skill exchange partners based on what you can teach and want to learn.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Built-in Chat</h3>
            <p className="text-muted-foreground">
              Communicate directly with potential partners to discuss details and arrange sessions.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Scheduling</h3>
            <p className="text-muted-foreground">
              Easily schedule sessions with an integrated calendar that works with your availability.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Session Tracking</h3>
            <p className="text-muted-foreground">
              Keep track of your teaching and learning sessions, with feedback and ratings.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted py-24">
        <div className="container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How SkillSwap Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Exchange skills in four simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and list the skills you can teach and the ones you want to learn.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Find Matches</h3>
              <p className="text-muted-foreground">
                Browse skills or get matched with users who complement your skill set.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Schedule Sessions</h3>
              <p className="text-muted-foreground">
                Arrange teaching and learning sessions that fit both your schedules.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold">Exchange Skills</h3>
              <p className="text-muted-foreground">
                Meet online or in-person to share knowledge and learn from each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container py-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of people already exchanging skills on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg space-y-4">
            <p className="text-muted-foreground">
              "I taught Spanish and learned how to play guitar. It's amazing how much you can learn when you teach
              someone else at the same time!"
            </p>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted h-10 w-10"></div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Language Teacher</p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg space-y-4">
            <p className="text-muted-foreground">
              "As a developer, I was able to share my coding knowledge while learning photography. The platform made it
              super easy to find the perfect match."
            </p>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted h-10 w-10"></div>
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Software Engineer</p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg space-y-4">
            <p className="text-muted-foreground">
              "I've always wanted to learn digital marketing but courses were too expensive. On SkillSwap, I traded my
              yoga instruction for marketing lessons!"
            </p>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-muted h-10 w-10"></div>
              <div>
                <p className="font-medium">Emma Rodriguez</p>
                <p className="text-sm text-muted-foreground">Yoga Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Ready to Start Exchanging Skills?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join our community today and discover the joy of teaching and learning.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Sign Up Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">Skill</span>
              <span>Swap</span>
            </div>
            <p className="text-muted-foreground">Exchange skills, grow together.</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
