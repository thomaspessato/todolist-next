'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FolderPlus, Folder, X, Settings } from 'lucide-react';
import { v4 as uuid } from 'uuid'; 
import { Todo, Folder as FolderType, TabType } from '@/types';

// Default folders
const defaultFolders: FolderType[] = [
  {
    id: 'default',
    name: 'General',
    color: '#6366f1', // indigo
    createdAt: new Date()
  },
  {
    id: 'work',
    name: 'Work',
    color: '#ec4899', // pink
    createdAt: new Date()
  },
  {
    id: 'personal',
    name: 'Personal',
    color: '#8b5cf6', // violet
    createdAt: new Date()
  }
];

export function TodoList() {
  // State management
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [folders, setFolders] = useLocalStorage<FolderType[]>('folders', defaultFolders);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedFolder, setSelectedFolder] = useState<string>('default');
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#6366f1');
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

  // Add a new todo
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuid(),
      text,
      completed: false,
      createdAt: new Date(),
      folderId: selectedFolder
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle todo completion status
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Add a new folder
  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FolderType = {
        id: uuid(),
        name: newFolderName.trim(),
        color: newFolderColor,
        createdAt: new Date()
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setIsNewFolderDialogOpen(false);
      setSelectedFolder(newFolder.id);
    }
  };

  // Delete a folder
  const handleDeleteFolder = (id: string) => {
    // Don't delete default folder
    if (id === 'default') return;
    
    // Move todos from deleted folder to default folder
    const updatedTodos = todos.map(todo => 
      todo.folderId === id ? { ...todo, folderId: 'default' } : todo
    );
    
    setTodos(updatedTodos);
    setFolders(folders.filter(folder => folder.id !== id));
    
    // If the selected folder is being deleted, switch to default
    if (selectedFolder === id) {
      setSelectedFolder('default');
    }
  };

  // Filter todos based on active tab and selected folder
  const filteredTodos = todos.filter(todo => {
    // First filter by folder
    const folderMatch = selectedFolder === 'all' ? true : todo.folderId === selectedFolder;
    
    // Then filter by completion status
    if (activeTab === 'all') return folderMatch;
    if (activeTab === 'pending') return folderMatch && !todo.completed;
    if (activeTab === 'completed') return folderMatch && todo.completed;
    
    return folderMatch;
  });

  // Get todos count for each folder
  const getFolderTodosCount = (folderId: string) => {
    return todos.filter(todo => todo.folderId === folderId).length;
  };

  // Calculate statistics
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completionPercentage = todos.length ? Math.round((completedTodos.length / todos.length) * 100) : 0;

  return (
    <div className="animate-fade-in">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-indigo-100 dark:border-indigo-900/30 shadow-md">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Total Tasks</p>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">{todos.length}</h3>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
              <Folder className="h-6 w-6 text-indigo-500 dark:text-indigo-300" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 border-emerald-100 dark:border-emerald-900/30 shadow-md">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">Completed</p>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">{completedTodos.length}</h3>
            </div>
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
              <div className="h-6 w-6 flex items-center justify-center text-emerald-500 dark:text-emerald-300">
                {completionPercentage}%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 border-orange-100 dark:border-orange-900/30 shadow-md">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-300">Pending</p>
              <h3 className="text-2xl font-bold mt-1 dark:text-white">{pendingTodos.length}</h3>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
              <div className="h-6 w-6 flex items-center justify-center text-orange-500 dark:text-orange-300">
                {todos.length ? Math.round((pendingTodos.length / todos.length) * 100) : 0}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Todo Form */}
      <TodoForm 
        onAddTodo={handleAddTodo} 
        folders={folders} 
        selectedFolder={selectedFolder}
        onFolderChange={setSelectedFolder}
      />

      {/* Folders and Tabs Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Folders Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Folders</h2>
            <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-8 w-8 p-0 bg-white"
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                  <DialogDescription>
                    Add a new folder to organize your tasks.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="folder-name" className="text-sm font-medium">
                      Folder Name
                    </label>
                    <Input
                      id="folder-name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="Enter folder name..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="folder-color" className="text-sm font-medium">
                      Folder Color
                    </label>
                    <div className="flex gap-2">
                      {['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                        <div
                          key={color}
                          className={`h-8 w-8 rounded-full cursor-pointer transition-transform ${
                            newFolderColor === color ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewFolderColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFolder} disabled={!newFolderName.trim()}>
                    Create Folder
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Button
            variant={selectedFolder === 'all' ? "default" : "outline"}
            className="w-full justify-start mb-2 transition-all-fast"
            onClick={() => setSelectedFolder('all')}
          >
            <span className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              All Folders ({todos.length})
            </span>
          </Button>
          
          <div className="space-y-2 staggered-animate">
            {folders.map(folder => (
              <div key={folder.id} className="flex items-center animate-slide-in opacity-0" style={{animationFillMode: 'forwards'}}>
                <Button
                  variant={selectedFolder === folder.id ? "default" : "outline"}
                  className="w-full justify-start transition-all-fast"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: folder.color }}></span>
                    {folder.name} ({getFolderTodosCount(folder.id)})
                  </span>
                </Button>
                
                {folder.id !== 'default' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-8 w-8 p-0 text-neutral-500 hover:text-red-500"
                    onClick={() => handleDeleteFolder(folder.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value as TabType)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredTodos.length > 0 ? (
                <div className="space-y-4 staggered-animate">
                  {filteredTodos.map((todo) => (
                    <div key={todo.id} className="animate-slide-in opacity-0" style={{animationFillMode: 'forwards'}}>
                      <TodoItem
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                        folderColor={folders.find(f => f.id === todo.folderId)?.color || '#6366f1'}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-neutral-50">
                  <div className="flex flex-col items-center">
                    <div className="bg-neutral-100 p-3 rounded-full mb-4">
                      <Plus className="h-6 w-6 text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-800">No tasks yet</h3>
                    <p className="text-neutral-500 mt-1">Add tasks using the form above</p>
                  </div>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {filteredTodos.length > 0 ? (
                <div className="space-y-4 staggered-animate">
                  {filteredTodos.map((todo) => (
                    <div key={todo.id} className="animate-slide-in opacity-0" style={{animationFillMode: 'forwards'}}>
                      <TodoItem
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                        folderColor={folders.find(f => f.id === todo.folderId)?.color || '#6366f1'}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-neutral-50">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-neutral-800">No pending tasks</h3>
                    <p className="text-neutral-500 mt-1">All caught up! 🎉</p>
                  </div>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {filteredTodos.length > 0 ? (
                <div className="space-y-4 staggered-animate">
                  {filteredTodos.map((todo) => (
                    <div key={todo.id} className="animate-slide-in opacity-0" style={{animationFillMode: 'forwards'}}>
                      <TodoItem
                        todo={todo}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                        folderColor={folders.find(f => f.id === todo.folderId)?.color || '#6366f1'}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-neutral-50">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium text-neutral-800">No completed tasks</h3>
                    <p className="text-neutral-500 mt-1">Complete some tasks to see them here</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}