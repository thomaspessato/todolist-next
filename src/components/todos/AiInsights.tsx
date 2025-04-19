"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  Sparkles, 
  BarChart3, 
  Brain, 
  Calendar, 
  Clock, 
  Loader2, 
  Lightbulb,
  PlusCircle,
  Trophy
} from "lucide-react";
import { Todo, TodoFolder } from '@/types';

interface AiInsightsProps {
  todos: Todo[];
  folders: TodoFolder[];
  onAddSuggestion: (task: Partial<Todo>) => void;
}

export function AiInsights({ todos, folders, onAddSuggestion }: AiInsightsProps) {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [loading, setLoading] = useState(true);
  const [suggestedTasks, setSuggestedTasks] = useState<Partial<Todo>[]>([]);
  const [productivity, setProductivity] = useState({
    score: 0,
    completed: 0,
    total: 0,
    weeklyTrend: [] as number[],
    focusHours: [] as { hour: number, count: number }[]
  });
  const [insights, setInsights] = useState<{
    title: string;
    description: string;
    type: 'positive' | 'negative' | 'neutral';
  }[]>([]);

  useEffect(() => {
    // Fetch AI insights from API
    const fetchInsights = async () => {
      setLoading(true);
      try {
        // Call the API endpoint
        const response = await fetch('/api/ai-insights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ todos }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch AI insights');
        }
        
        const data = await response.json();
        
        // Update state with API response
        setSuggestedTasks(data.suggestedTasks);
        setProductivity(data.productivity);
        setInsights(data.insights);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        // Fallback to mock data if API fails
        generateMockData();
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have todos
    if (todos.length > 0) {
      fetchInsights();
    } else {
      setLoading(false);
    }
  }, [todos]);

  // Keep generateMockData as a fallback
  const generateMockData = () => {
    // Task suggestions based on existing patterns
    const completedTodos = todos.filter(todo => todo.completed);
    const incompleteTodos = todos.filter(todo => !todo.completed);
    
    // Mock suggested tasks based on user's existing task patterns
    const taskSuggestions: Partial<Todo>[] = [
      {
        title: "Review weekly progress",
        folder: folders.find(f => f.name.toLowerCase().includes("work"))?.id || folders[0]?.id,
        priority: "medium",
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      },
      {
        title: "Schedule team meeting",
        folder: folders.find(f => f.name.toLowerCase().includes("work"))?.id || folders[0]?.id,
        priority: "high",
        dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
      },
      {
        title: "Prepare monthly report",
        folder: folders.find(f => f.name.toLowerCase().includes("work"))?.id || folders[0]?.id,
        priority: "high",
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      }
    ];
    
    // Calculate productivity metrics
    const totalTasks = todos.length;
    const completedTasks = completedTodos.length;
    const productivityScore = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;
    
    // Generate mock weekly trend (last 7 days completion rates)
    const weeklyTrend = Array(7).fill(0).map(() => Math.floor(Math.random() * 100));
    
    // Generate mock focus hours (when user completes most tasks)
    const focusHours = [
      { hour: 9, count: Math.floor(Math.random() * 10) + 5 },
      { hour: 10, count: Math.floor(Math.random() * 10) + 8 },
      { hour: 11, count: Math.floor(Math.random() * 10) + 6 },
      { hour: 14, count: Math.floor(Math.random() * 10) + 7 },
      { hour: 15, count: Math.floor(Math.random() * 10) + 9 },
      { hour: 16, count: Math.floor(Math.random() * 10) + 4 }
    ].sort((a, b) => b.count - a.count);
    
    // Generate behavioral insights based on todos
    const taskInsights = [
      {
        title: "Peak productivity detected",
        description: "You complete most tasks between 10 AM and 11 AM. Consider scheduling important work during this time.",
        type: 'positive' as const
      },
      {
        title: "Potential task overload",
        description: `You have ${incompleteTodos.length} incomplete tasks. Consider breaking them down into smaller, more manageable tasks.`,
        type: 'neutral' as const
      },
      {
        title: "Consistent completion pattern",
        description: "You've been completing tasks regularly this week. Keep up the good work!",
        type: 'positive' as const
      }
    ];
    
    if (incompleteTodos.filter(t => t.priority === "high").length > 3) {
      taskInsights.push({
        title: "High priority backlog",
        description: "You have several high priority tasks pending. Consider focusing on these first.",
        type: 'negative' as const
      });
    }
    
    if (weeklyTrend[weeklyTrend.length - 1] > weeklyTrend[0]) {
      taskInsights.push({
        title: "Improving completion rate",
        description: "Your task completion rate is trending upward. Great progress!",
        type: 'positive' as const
      });
    }
    
    // Update state with generated data
    setSuggestedTasks(taskSuggestions);
    setProductivity({
      score: productivityScore,
      completed: completedTasks,
      total: totalTasks,
      weeklyTrend,
      focusHours
    });
    setInsights(taskInsights);
  };

  const handleAddSuggestion = (task: Partial<Todo>) => {
    onAddSuggestion(task);
    // Remove the suggestion from the list
    setSuggestedTasks(prev => prev.filter(t => t !== task));
  };

  const formatHour = (hour: number) => {
    return `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? 'AM' : 'PM'}`;
  };

  return (
    <Card className="border-0 shadow-lg dark:shadow-gray-900/10 mb-6">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-t-lg border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
              TaskFlow AI Insights
            </CardTitle>
            <CardDescription>
              Personalized insights to boost your productivity
            </CardDescription>
          </div>
          {loading && (
            <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger value="suggestions" className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Smart Suggestions</span>
              <span className="sm:hidden">Suggestions</span>
            </TabsTrigger>
            <TabsTrigger value="productivity" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Productivity</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestions" className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-500" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzing your tasks and generating smart suggestions...
                  </p>
                </div>
              </div>
            ) : suggestedTasks.length > 0 ? (
              <div className="space-y-3">
                {suggestedTasks.map((task, index) => {
                  const folderName = folders.find(f => f.id === task.folder)?.name || "General";
                  return (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-lg p-4 flex items-start justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center">
                          <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {task.dueDate 
                                ? new Date(task.dueDate).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  }) 
                                : "No due date"}
                            </span>
                          </div>
                          <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                          <span>{folderName}</span>
                          {task.priority && (
                            <>
                              <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                              <Badge 
                                variant="outline" 
                                className={
                                  task.priority === 'high' 
                                    ? 'border-red-200 text-red-600 dark:border-red-800 dark:text-red-400 bg-red-50/50 dark:bg-red-900/20' 
                                    : task.priority === 'medium'
                                    ? 'border-amber-200 text-amber-600 dark:border-amber-800 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20'
                                    : 'border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                                }
                              >
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/20"
                        onClick={() => handleAddSuggestion(task)}
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  );
                })}
                <div className="pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    These suggestions are based on your task history and completion patterns
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-medium mb-2">No suggestions available</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Complete more tasks to get personalized suggestions
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateMockData}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Demo Suggestions
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="productivity" className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-500" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Calculating productivity metrics...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-medium">Productivity Score</h3>
                    <div className="relative flex items-center justify-center my-4">
                      <svg className="w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-100 dark:text-gray-800"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={56 * 2 * Math.PI}
                          strokeDashoffset={56 * 2 * Math.PI * (1 - productivity.score / 100)}
                          className="text-indigo-500 dark:text-indigo-400"
                          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold">{productivity.score}%</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Completion</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {productivity.completed}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {productivity.total}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Weekly trend */}
                  <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-lg p-6">
                    <h3 className="text-sm font-medium mb-4 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                      Weekly Trend
                    </h3>
                    <div className="h-32 flex items-end space-x-2">
                      {productivity.weeklyTrend.map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-indigo-500 dark:bg-indigo-400 rounded-t"
                            style={{ height: `${Math.max(5, value)}%` }}
                          ></div>
                          <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Peak focus hours */}
                  <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-lg p-6">
                    <h3 className="text-sm font-medium mb-4 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                      Peak Focus Hours
                    </h3>
                    <div className="space-y-3">
                      {productivity.focusHours.slice(0, 3).map((hour, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span>{formatHour(hour.hour)}</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              {hour.count} tasks completed
                            </span>
                          </div>
                          {/* <Progress value={(hour.count / productivity.focusHours[0].count) * 100} /> */}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Schedule important tasks during your peak focus hours to maximize productivity
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-500" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzing your productivity patterns...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div 
                      key={index} 
                      className={`
                        border rounded-lg p-4
                        ${insight.type === 'positive' 
                          ? 'bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30' 
                          : insight.type === 'negative'
                          ? 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-800/30'
                          : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30'
                        }
                      `}
                    >
                      <div className="flex">
                        <div className={`
                          p-2 rounded-full mr-3
                          ${insight.type === 'positive' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : insight.type === 'negative'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }
                        `}>
                          {insight.type === 'positive' ? (
                            <Trophy className="h-5 w-5" />
                          ) : insight.type === 'negative' ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <Lightbulb className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{insight.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Insights are generated based on your task completion patterns and habits.
                  </p>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}