export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  folder: string;
  dueDate?: string;
}

export interface TodoFolder {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export type TabType = 'all' | 'pending' | 'completed' | 'today' | 'tomorrow' | 'upcoming' | 'overdue';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  defaultView?: 'list' | 'grid';
  notifications?: NotificationPreference[];
}

export interface NotificationPreference {
  id: string;
  type: 'due_soon' | 'daily_summary' | 'weekly_report' | 'personal_insights';
  enabled: boolean;
}

export interface AiInsight {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface ProductivityMetrics {
  score: number;
  completed: number;
  total: number;
  weeklyTrend: number[];
  focusHours: { hour: number; count: number }[];
}