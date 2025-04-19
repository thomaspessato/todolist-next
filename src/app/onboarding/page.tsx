"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Folder, 
  Bell,
  Calendar, 
  Loader2
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  
  const categories = [
    { id: "work", name: "Work", icon: "💼" },
    { id: "personal", name: "Personal", icon: "🏠" },
    { id: "health", name: "Health", icon: "❤️" },
    { id: "education", name: "Education", icon: "📚" },
    { id: "finance", name: "Finance", icon: "💰" },
    { id: "other", name: "Other", icon: "✨" },
  ];
  
  const notificationOptions = [
    { id: "due_soon", name: "Tasks due soon" },
    { id: "daily_summary", name: "Daily summary" },
    { id: "weekly_report", name: "Weekly productivity report" },
    { id: "personal_insights", name: "Personal productivity insights" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const toggleNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const completeOnboarding = async () => {
    setIsLoading(true);
    
    try {
      // Simulated API call to save onboarding preferences
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would send this data to the backend
      const onboardingData = {
        name,
        primaryCategory: selectedCategory,
        notificationPreferences: selectedNotifications,
      };
      
      console.log("Onboarding complete with data:", onboardingData);
      
      // Redirect to the todos page
      router.push("/todos");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const steps = [
    // Step 1: Welcome
    {
      title: "Welcome to TaskFlow",
      description: "Let's set up your account in just a few steps.",
      content: (
        <div className="space-y-6">
          <div className="h-40 w-40 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <Sparkles className="h-20 w-20 text-indigo-500 dark:text-indigo-400" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-medium">Personalize your experience</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We'll help you get started with TaskFlow by customizing it to your needs.
            </p>
          </div>
        </div>
      )
    },
    
    // Step 2: Name input
    {
      title: "What should we call you?",
      description: "We'll use this to personalize your TaskFlow experience.",
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            This helps us personalize your experience and notifications.
          </div>
        </div>
      )
    },
    
    // Step 3: Primary Task Category
    {
      title: "What will you use TaskFlow for?",
      description: "Select the primary category for your tasks.",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id 
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" 
                    : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                  
                  {selectedCategory === category.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't worry, you can always create more categories later.
          </div>
        </div>
      )
    },
    
    // Step 4: Notification preferences
    {
      title: "Notification preferences",
      description: "How would you like TaskFlow to keep you updated?",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {notificationOptions.map((option) => (
              <div 
                key={option.id}
                className={`p-4 rounded-lg border cursor-pointer flex items-center space-x-3 transition-all ${
                  selectedNotifications.includes(option.id) 
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" 
                    : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                }`}
                onClick={() => toggleNotification(option.id)}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  selectedNotifications.includes(option.id)
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  {selectedNotifications.includes(option.id) && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </div>
                <span className="font-medium">{option.name}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            You can change these settings anytime in your profile.
          </div>
        </div>
      )
    },
    
    // Step 5: All Set
    {
      title: "You're all set!",
      description: "Your TaskFlow experience is ready.",
      content: (
        <div className="space-y-6">
          <div className="h-40 w-40 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500 dark:text-green-400" />
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-xl font-medium">
              Ready to boost your productivity
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your account is ready and your preferences have been saved. Let's start organizing your tasks!
            </p>
          </div>
        </div>
      )
    },
  ];

  const currentStepData = steps[currentStep];
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>
        
        {/* Step content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{currentStepData.description}</p>
          </div>
          
          <div className="my-8">
            {currentStepData.content}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0 || isLoading}
            >
              Back
            </Button>
            
            <Button
              onClick={nextStep}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white ${
                (currentStep === 1 && !name) || 
                (currentStep === 2 && !selectedCategory) 
                  ? "opacity-50 cursor-not-allowed" 
                  : ""
              }`}
              disabled={
                isLoading ||
                (currentStep === 1 && !name) || 
                (currentStep === 2 && !selectedCategory)
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Features preview */}
        {currentStep < steps.length - 1 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800/90 p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <Folder className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-medium mt-4 mb-2">Organize Your Tasks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create folders with custom colors to visually organize your tasks.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/90 p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-medium mt-4 mb-2">Smart Reminders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Never miss a deadline with customizable reminders and notifications.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/90 p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-medium mt-4 mb-2">Schedule Tasks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plan your day, week, or month with our intuitive scheduling features.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}