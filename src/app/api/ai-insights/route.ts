import { NextResponse } from 'next/server';
import { Todo } from '@/types';

export async function POST(request: Request) {
  try {
    const { todos } = await request.json();
    
    // In a production environment, this would call an actual AI service
    // For now, we'll simulate the AI response with predefined insights
    
    // Analyze todos data
    const completedTodos = todos.filter((todo: Todo) => todo.completed);
    const incompleteTodos = todos.filter((todo: Todo) => !todo.completed);
    const highPriorityTodos = incompleteTodos.filter((todo: Todo) => todo.priority === 'high');
    
    // Generate sample task suggestions based on user's task patterns
    const taskSuggestions = [
      {
        title: "Review weekly progress",
        priority: "medium",
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        folder: todos[0]?.folder || "work",
      },
      {
        title: "Schedule team meeting",
        priority: "high",
        dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
        folder: todos[0]?.folder || "work",
      },
      {
        title: "Prepare monthly report",
        priority: "high",
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        folder: todos[0]?.folder || "work",
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
    const insights = [
      {
        title: "Peak productivity detected",
        description: "You complete most tasks between 10 AM and 11 AM. Consider scheduling important work during this time.",
        type: 'positive'
      },
      {
        title: "Potential task overload",
        description: `You have ${incompleteTodos.length} incomplete tasks. Consider breaking them down into smaller, more manageable tasks.`,
        type: 'neutral'
      }
    ];
    
    if (incompleteTodos.length > 0) {
      insights.push({
        title: "Consistent completion pattern",
        description: "You've been completing tasks regularly. Keep up the good work!",
        type: 'positive'
      });
    }
    
    if (highPriorityTodos.length > 3) {
      insights.push({
        title: "High priority backlog",
        description: "You have several high priority tasks pending. Consider focusing on these first.",
        type: 'negative'
      });
    }
    
    if (weeklyTrend[weeklyTrend.length - 1] > weeklyTrend[0]) {
      insights.push({
        title: "Improving completion rate",
        description: "Your task completion rate is trending upward. Great progress!",
        type: 'positive'
      });
    }

    return NextResponse.json({
      suggestedTasks: taskSuggestions,
      productivity: {
        score: productivityScore,
        completed: completedTasks,
        total: totalTasks,
        weeklyTrend,
        focusHours
      },
      insights
    });
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}