'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Trash2, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '@/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  folderColor: string;
}

export function TodoItem({ todo, onToggle, onDelete, folderColor }: TodoItemProps) {
  return (
    <Card 
      className={`p-4 transition-all duration-200 hover:shadow-md ${
        todo.completed 
        ? 'bg-neutral-50 dark:bg-slate-800 border-neutral-200 dark:border-slate-700' 
        : 'bg-white dark:bg-slate-800 border-l-4'
      }`}
      style={{ borderLeftColor: todo.completed ? undefined : folderColor }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 flex-grow">
          <div className="relative">
            <Checkbox 
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              id={`todo-${todo.id}`}
              className={`h-5 w-5 rounded-full transition-all ${
                todo.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-2'
              }`}
            />
            {todo.completed && (
              <Check className="h-3 w-3 text-white absolute top-1 left-1 pointer-events-none" />
            )}
          </div>
          
          <div className="flex-grow">
            <label 
              htmlFor={`todo-${todo.id}`} 
              className={`text-base cursor-pointer flex-grow ${
                todo.completed ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-neutral-800 dark:text-gray-100'
              }`}
            >
              {todo.text}
            </label>
            
            <div className="flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400 gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(todo.id)}
          className="h-8 w-8 rounded-full text-neutral-400 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete task</span>
        </Button>
      </div>
    </Card>
  );
}