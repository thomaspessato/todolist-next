import './globals.css';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'TaskFlow - Modern Task Management',
  description: 'A modern task management app for organizing your life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80">
          {/* Animated background shapes */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-[40%] -right-[20%] w-[80%] aspect-square rounded-full bg-gradient-to-tr from-indigo-100/50 to-purple-100/50 blur-3xl animate-pulse-subtle"></div>
            <div className="absolute -bottom-[30%] -left-[20%] w-[70%] aspect-square rounded-full bg-gradient-to-tr from-blue-100/40 to-indigo-100/40 blur-3xl animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                      <path d="M9 16h6"></path>
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    TaskFlow
                  </h1>
                </div>
                
                <nav>
                  <ul className="flex gap-4">
                    <li>
                      <a 
                        href="https://github.com" 
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#"
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm px-4 py-2 rounded-full transition-colors"
                      >
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
            
            <main>{children}</main>
            
            <footer className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 text-sm text-gray-500">
                <p>© 2025 TaskFlow. All rights reserved.</p>
                
                <nav>
                  <ul className="flex gap-4">
                    <li>
                      <a href="#" className="hover:text-indigo-600 transition-colors">
                        Terms
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600 transition-colors">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600 transition-colors">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
