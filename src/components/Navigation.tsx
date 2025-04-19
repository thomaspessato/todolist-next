'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { User } from '@/types';

export function Navigation() {
  const pathname = usePathname();
  
  // Initialize with null and use useEffect to check localStorage to avoid hydration errors
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  
  // Check for the user in localStorage on the client side
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);
  
  const isLoggedIn = !!currentUser;

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="flex items-center gap-3">
      {/* Navigation links always visible */}
      <Link href="/todos" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        Tasks
      </Link>
      
      {/* Links that should only be visible when NOT logged in */}
      {!isLoggedIn && (
        <>
          <a 
            href="https://github.com/your-repo/todolist-old-people" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            GitHub
          </a>
          <Link href="/about" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            About
          </Link>
          <Link href="/register" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Sign Up
          </Link>
        </>
      )}
      
      {/* Conditional buttons based on login status */}
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <Link href="/settings">
            <Button variant="ghost" size="sm">Settings</Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="outline" size="sm">Sign In</Button>
        </Link>
      )}
      
      {/* Theme toggle is always visible */}
      <ThemeToggle />
    </nav>
  );
}