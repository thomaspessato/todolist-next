import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Zap, Clock, Smartphone, ArrowRight, Github } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            <div className="flex flex-col gap-4 md:gap-6 max-w-md lg:max-w-xl">
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                  <span className="animate-pulse mr-1">🚀</span> Just launched! Try our new AI-powered insights
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter lg:leading-[1.1]">
                Manage tasks with clarity and <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">purpose</span>.
              </h1>
              <p className="text-lg text-muted-foreground">
                TaskFlow transforms how you organize your work and life. Create folders, track progress, and achieve your goals with our intuitive task management platform.
              </p>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <Link href="/register" passHref>
                  <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/50">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button variant="outline" size="lg" className="border-2">
                    Login
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 lg:w-[550px] md:h-[420px] overflow-hidden rounded-xl border bg-gradient-to-b from-neutral-50/70 to-neutral-100/70 dark:from-neutral-900/70 dark:to-neutral-800/70 p-1 shadow-xl backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/80 via-transparent to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 opacity-50"></div>
              <div className="relative h-full w-full overflow-hidden rounded-lg border bg-background shadow-sm">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="TaskFlow Dashboard Preview"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-neutral-50/80 dark:to-neutral-900/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-10">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to stay organized</h2>
              <p className="text-muted-foreground mx-auto max-w-[700px]">
                Streamline your workflow with our powerful features designed for productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center gap-2 p-6 bg-card rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intelligent Organization</h3>
                <p className="text-muted-foreground text-center">
                  Organize tasks into folders with custom colors for easy visual recognition.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center gap-2 p-6 bg-card rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Sync</h3>
                <p className="text-muted-foreground text-center">
                  Access your tasks anywhere with real-time synchronization across all devices.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center gap-2 p-6 bg-card rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
                <div className="rounded-full bg-primary/10 p-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Mobile-first Design</h3>
                <p className="text-muted-foreground text-center">
                  Optimized for a seamless experience on any device, from desktop to mobile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
                  <span className="mr-1">✨</span> New
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">AI-Powered Task Insights</h2>
              <p className="text-lg text-muted-foreground">
                Our smart assistant analyzes your task patterns and offers personalized suggestions to improve your productivity and help you achieve more.
              </p>
              <ul className="grid gap-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span>Get intelligent task prioritization suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span>Receive personalized productivity insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span>Track your efficiency trends over time</span>
                </li>
              </ul>
              <Link href="/register" passHref>
                <Button className="w-fit">
                  Try AI Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10"></div>
              <Image
                src="/images/ai-insights-preview.png"
                alt="AI Insights Preview"
                fill
                className="object-cover"
                quality={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-t from-transparent to-neutral-50/80 dark:to-neutral-900/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Loved by people like you</h2>
              <p className="text-muted-foreground mx-auto max-w-[600px]">
                Join thousands of users who have transformed how they manage tasks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {/* Testimonial 1 */}
              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
                <p className="text-muted-foreground italic">
                  "TaskFlow has completely changed how I organize my work. The folder system is intuitive and the AI insights are surprisingly helpful!"
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <Image
                      src="/images/avatar-1.png"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex Morgan</p>
                    <p className="text-xs text-muted-foreground">Product Designer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
                <p className="text-muted-foreground italic">
                  "I've tried many todo apps, but TaskFlow's combination of simplicity and power features makes it stand out. The mobile experience is excellent too."
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <Image
                      src="/images/avatar-2.png"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jessica Chen</p>
                    <p className="text-xs text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col gap-4 p-6 bg-card rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-800/50">
                <p className="text-muted-foreground italic">
                  "The AI insights have helped me identify productivity patterns I never noticed before. Now I complete 30% more tasks each week!"
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <Image
                      src="/images/avatar-3.png"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael Torres</p>
                    <p className="text-xs text-muted-foreground">Marketing Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center gap-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-12 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold">Start organizing your tasks today</h2>
            <p className="max-w-[600px] text-white/80">
              Join thousands of users who are transforming how they manage tasks and achieve their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" passHref>
                <Button size="lg" variant="secondary" className="font-semibold">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://github.com/yourusername/taskflow" passHref>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
