'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { Folder } from '@/types';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
  folders: Folder[];
  selectedFolder: string;
  onFolderChange: (folderId: string) => void;
}

export function TodoForm({ onAddTodo, folders, selectedFolder, onFolderChange }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-slate-700 shadow-sm border border-indigo-100/50 dark:border-indigo-900/30">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Add New Task</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <Input
                id="todo-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className="text-base border-2 border-neutral-200/80 h-12 pl-4 pr-4 focus-visible:ring-indigo-400/30 transition-all"
                aria-label="Enter your task"
              />
            </div>
            
            <Select 
              value={selectedFolder} 
              onValueChange={onFolderChange}
            >
              <SelectTrigger className="w-full md:w-40 h-12 border-2 border-neutral-200/80 focus-visible:ring-indigo-400/30">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map(folder => (
                  <SelectItem key={folder.id} value={folder.id} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className="block h-3 w-3 rounded-full" 
                        style={{ backgroundColor: folder.color }}
                      />
                      {folder.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              type="submit" 
              className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transition-all duration-300"
              disabled={!text.trim()}
            >
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}