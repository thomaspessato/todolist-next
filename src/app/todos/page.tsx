"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  CheckCircle2,
  Circle,
  Trash2,
  Pencil,
  Sparkles,
  Folder,
  X,
  Plus,
  Menu
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo, TodoFolder } from "@/types";
import { format, isToday, isTomorrow } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

export default function TodosPage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [folders, setFolders] = useLocalStorage<TodoFolder[]>("folders", [
    { id: "all", name: "All Tasks", color: "#4F46E5" },
    { id: "work", name: "Work", color: "#10B981" },
    { id: "personal", name: "Personal", color: "#F59E0B" },
    { id: "shopping", name: "Shopping", color: "#EF4444" },
    { id: "health", name: "Health", color: "#8B5CF6" },
  ]);
  
  // State management
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateAiTasksDialogOpen, setIsCreateAiTasksDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isLoadingAiTasks, setIsLoadingAiTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Filter todos based on selected folder
  const filteredTodos = todos.filter((todo) => {
    if (selectedFolder === "all") return true;
    return todo.folder === selectedFolder;
  });

  // Add a new todo
  const addTodo = () => {
    if (newTaskTitle.trim()) {
      const newTodo: Todo = {
        id: uuidv4(),
        title: newTaskTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        folder: selectedFolder === "all" ? folders[1].id : selectedFolder,
      };
      setTodos([newTodo, ...todos]);
      setNewTaskTitle("");
    }
  };

  // Toggle todo completion status
  const toggleTodoCompletion = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Open edit dialog
  const openEditDialog = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditDialogOpen(true);
  };

  // Update edited todo
  const updateTodo = () => {
    if (editingTodo) {
      setTodos(
        todos.map((todo) => (todo.id === editingTodo.id ? editingTodo : todo))
      );
      setIsEditDialogOpen(false);
      setEditingTodo(null);
    }
  };

  // Generate AI tasks
  const generateAiTasks = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsLoadingAiTasks(true);
    
    try {
      // In a real app, we would call an API here
      // For now, let's simulate the AI generating tasks
      setTimeout(() => {
        const generatedTasks = generateMockAiTasks(aiPrompt);
        setTodos([...generatedTasks, ...todos]);
        setAiPrompt("");
        setIsCreateAiTasksDialogOpen(false);
        setIsLoadingAiTasks(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating AI tasks:", error);
      setIsLoadingAiTasks(false);
    }
  };

  // Mock function to simulate AI task generation
  const generateMockAiTasks = (prompt: string): Todo[] => {
    const lowercasePrompt = prompt.toLowerCase();
    let generatedTasks: Todo[] = [];
    
    // Work-related tasks
    if (lowercasePrompt.includes("work") || lowercasePrompt.includes("project")) {
      generatedTasks = [
        {
          id: uuidv4(),
          title: "Create project timeline",
          description: "Outline key milestones and deadlines",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "work",
        },
        {
          id: uuidv4(),
          title: "Schedule team meeting",
          description: "Discuss project progress and next steps",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "work",
        },
        {
          id: uuidv4(),
          title: "Prepare presentation slides",
          description: "Create slides for the upcoming client meeting",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "work",
        }
      ];
    }
    // Shopping tasks
    else if (lowercasePrompt.includes("shop") || lowercasePrompt.includes("grocery")) {
      generatedTasks = [
        {
          id: uuidv4(),
          title: "Buy fruits and vegetables",
          description: "Apples, bananas, spinach, carrots",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "shopping",
        },
        {
          id: uuidv4(),
          title: "Get dairy products",
          description: "Milk, cheese, yogurt",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "shopping",
        },
        {
          id: uuidv4(),
          title: "Household supplies",
          description: "Paper towels, cleaning products",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "shopping",
        }
      ];
    }
    // Health tasks
    else if (lowercasePrompt.includes("health") || lowercasePrompt.includes("exercise")) {
      generatedTasks = [
        {
          id: uuidv4(),
          title: "Morning workout",
          description: "30 minutes cardio and strength training",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "health",
        },
        {
          id: uuidv4(),
          title: "Schedule annual checkup",
          description: "Call doctor's office to set appointment",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "health",
        },
        {
          id: uuidv4(),
          title: "Plan healthy meals",
          description: "Create meal plan for the week",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "health",
        }
      ];
    }
    // Personal tasks
    else {
      generatedTasks = [
        {
          id: uuidv4(),
          title: `${prompt.split(" ")[0]} - Task 1`,
          description: "Generated from your prompt",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "personal",
        },
        {
          id: uuidv4(),
          title: `${prompt.split(" ")[0]} - Task 2`,
          description: "Generated from your prompt",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "personal",
        },
        {
          id: uuidv4(),
          title: `${prompt.split(" ")[0]} - Task 3`,
          description: "Generated from your prompt",
          completed: false,
          createdAt: new Date().toISOString(),
          folder: "personal",
        }
      ];
    }
    
    return generatedTasks;
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileDrawerOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Task Manager</h1>
        <div className="w-8"></div> {/* Spacer to center the title */}
      </div>
      
      {/* Desktop Title - hidden on mobile */}
      <h1 className="hidden md:block text-2xl font-bold mb-6">Task Manager</h1>
      
      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileDrawerOpen(false)}
        ></div>
      )}
      
      {/* Mobile Folder Drawer - slides from left */}
      <div 
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-background z-50 transform ${
          isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out p-4 shadow-lg border-r`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Folders</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileDrawerOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={`flex items-center w-full p-2 rounded-md transition-colors ${
                selectedFolder === folder.id
                  ? "bg-slate-100 dark:bg-slate-800"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              onClick={() => {
                setSelectedFolder(folder.id);
                setIsMobileDrawerOpen(false);
              }}
            >
              <div 
                className="w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: folder.color }}
              />
              <span className="flex-1 text-left">{folder.name}</span>
              {selectedFolder === folder.id && folder.id !== "all" && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {todos.filter(todo => todo.folder === folder.id).length}
                </span>
              )}
              {selectedFolder === "all" && folder.id === "all" && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {todos.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar with Folders - Hidden on Mobile */}
        <div className="hidden md:block md:col-span-1">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Folders</h2>
            <div className="space-y-2">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  className={`flex items-center w-full p-2 rounded-md transition-colors ${
                    selectedFolder === folder.id
                      ? "bg-slate-100 dark:bg-slate-800"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="flex-1 text-left">{folder.name}</span>
                  {selectedFolder === folder.id && folder.id !== "all" && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {todos.filter(todo => todo.folder === folder.id).length}
                    </span>
                  )}
                  {selectedFolder === "all" && folder.id === "all" && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {todos.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Main Content Area */}
        <div className="md:col-span-3">
          <Card className="p-4">
            {/* Header with AI Create Button */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {folders.find(f => f.id === selectedFolder)?.name || "All Tasks"}
              </h2>
              <Button
                onClick={() => setIsCreateAiTasksDialogOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Create with AI</span>
                <span className="sm:hidden">AI</span>
              </Button>
            </div>
            
            {/* Add Task Input */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTodo();
                }}
              />
              <Button onClick={addTodo} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Todo List */}
            <div className="space-y-3">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center p-3 border rounded-md ${
                      todo.completed
                        ? "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800"
                        : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <button
                      onClick={() => toggleTodoCompletion(todo.id)}
                      className="mr-3 flex-shrink-0"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <p className={todo.completed ? "line-through text-gray-500" : ""}>
                        {todo.title}
                      </p>
                      {todo.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {todo.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Display folder if on All Tasks view */}
                    {selectedFolder === "all" && (
                      <div className="mx-3">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: folders.find(f => f.id === todo.folder)?.color || "#4F46E5"
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(todo)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <Folder className="mx-auto h-12 w-12 opacity-20 mb-2" />
                  <h3 className="font-medium">No tasks yet</h3>
                  <p className="text-sm mt-1">
                    Add a task above or use AI to create multiple tasks
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={editingTodo?.title || ""}
                onChange={(e) =>
                  setEditingTodo(
                    editingTodo ? { ...editingTodo, title: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="description"
                value={editingTodo?.description || ""}
                onChange={(e) =>
                  setEditingTodo(
                    editingTodo ? { ...editingTodo, description: e.target.value } : null
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="folder" className="text-sm font-medium">
                Folder
              </label>
              <select
                id="folder"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                value={editingTodo?.folder}
                onChange={(e) =>
                  setEditingTodo(
                    editingTodo ? { ...editingTodo, folder: e.target.value } : null
                  )
                }
              >
                {folders.filter(f => f.id !== "all").map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateTodo}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Create AI Tasks Dialog */}
      <Dialog open={isCreateAiTasksDialogOpen} onOpenChange={setIsCreateAiTasksDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Tasks with AI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Describe what you need to do, and AI will generate a list of tasks for you.
            </p>
            <Textarea
              placeholder="E.g., Prepare for vacation, Start a new work project, Weekly grocery shopping..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCreateAiTasksDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={generateAiTasks}
              disabled={isLoadingAiTasks || !aiPrompt.trim()}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoadingAiTasks ? (
                <>
                  <span className="animate-spin mr-2">●</span>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Tasks
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}