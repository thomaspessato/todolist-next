"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Check,
  Save,
  Palette,
  Monitor,
  Moon,
  Sun,
  Bell,
  Trash2,
  FolderPlus,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Todo, TodoFolder } from "@/types";

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [folders, setFolders] = useLocalStorage<TodoFolder[]>("folders", []);
  const [isClearDataDialogOpen, setIsClearDataDialogOpen] = useState(false);
  
  // User preferences
  const [preferences, setPreferences] = useLocalStorage("user_preferences", {
    theme: "system" as "light" | "dark" | "system",
    defaultView: "list" as "list" | "grid",
    defaultTab: "all" as "all" | "today" | "upcoming",
    notifications: {
      enableReminders: true,
      enableSummary: true,
      reminderTime: "09:00",
      summaryDay: "monday",
    },
  });
  
  // New folder state
  const [newFolder, setNewFolder] = useState({
    name: "",
    color: "#4F46E5",
  });

  // Save preferences
  const savePreferences = () => {
    setLoading(true);
    
    // Simulate API call to save preferences
    setTimeout(() => {
      toast({
        title: "Preferences saved",
        description: "Your settings have been updated successfully.",
      });
      setLoading(false);
    }, 800);
  };
  
  // Handle theme change
  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setPreferences({
      ...preferences,
      theme,
    });
    
    // Update document with the selected theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };
  
  // Clear all app data
  const handleClearData = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Clear todos and folders
      setTodos([]);
      setFolders([
        { id: "work", name: "Work", color: "#4F46E5" },
        { id: "personal", name: "Personal", color: "#10B981" },
        { id: "shopping", name: "Shopping", color: "#F59E0B" },
        { id: "health", name: "Health", color: "#EF4444" },
      ]);
      
      toast({
        title: "Data cleared",
        description: "All your tasks and custom folders have been removed.",
      });
      
      setIsClearDataDialogOpen(false);
      setLoading(false);
      
      // Redirect to todos page
      router.push("/todos");
    }, 1000);
  };
  
  // Add new folder
  const handleAddFolder = () => {
    if (!newFolder.name) {
      toast({
        title: "Folder name required",
        description: "Please enter a name for your new folder.",
        variant: "destructive",
      });
      return;
    }
    
    const id = newFolder.name.toLowerCase().replace(/\s+/g, "-");
    
    const folderExists = folders.some(
      (f) => f.id === id || f.name.toLowerCase() === newFolder.name.toLowerCase()
    );
    
    if (folderExists) {
      toast({
        title: "Folder already exists",
        description: "A folder with this name already exists.",
        variant: "destructive",
      });
      return;
    }
    
    setFolders([
      ...folders,
      {
        id,
        name: newFolder.name,
        color: newFolder.color,
      },
    ]);
    
    setNewFolder({
      name: "",
      color: "#4F46E5",
    });
    
    toast({
      title: "Folder created",
      description: `"${newFolder.name}" folder has been created successfully.`,
    });
  };
  
  // Delete folder
  const handleDeleteFolder = (folderId: string) => {
    // Check if the folder has tasks
    const hasTasks = todos.some((todo) => todo.folder === folderId);
    
    if (hasTasks) {
      toast({
        title: "Cannot delete folder",
        description: "This folder contains tasks. Please move or delete them first.",
        variant: "destructive",
      });
      return;
    }
    
    setFolders(folders.filter((folder) => folder.id !== folderId));
    
    toast({
      title: "Folder deleted",
      description: "The folder has been deleted successfully.",
    });
  };

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your preferences and customize TaskFlow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex gap-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            onClick={savePreferences}
            className="gap-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="folders">
            <FolderPlus className="h-4 w-4 mr-2" />
            Folders
          </TabsTrigger>
          <TabsTrigger value="data">
            <Trash2 className="h-4 w-4 mr-2" />
            Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose your preferred color theme for the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={preferences.theme === "light" ? "default" : "outline"}
                  className="flex flex-col items-center py-6 h-auto gap-3"
                  onClick={() => handleThemeChange("light")}
                >
                  <Sun className="h-6 w-6" />
                  <span>Light</span>
                  {preferences.theme === "light" && (
                    <Check className="h-4 w-4 absolute top-2 right-2" />
                  )}
                </Button>
                <Button
                  variant={preferences.theme === "dark" ? "default" : "outline"}
                  className="flex flex-col items-center py-6 h-auto gap-3"
                  onClick={() => handleThemeChange("dark")}
                >
                  <Moon className="h-6 w-6" />
                  <span>Dark</span>
                  {preferences.theme === "dark" && (
                    <Check className="h-4 w-4 absolute top-2 right-2" />
                  )}
                </Button>
                <Button
                  variant={preferences.theme === "system" ? "default" : "outline"}
                  className="flex flex-col items-center py-6 h-auto gap-3"
                  onClick={() => handleThemeChange("system")}
                >
                  <Monitor className="h-6 w-6" />
                  <span>System</span>
                  {preferences.theme === "system" && (
                    <Check className="h-4 w-4 absolute top-2 right-2" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>View Preferences</CardTitle>
              <CardDescription>
                Choose your default view for tasks and lists.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default View Mode</Label>
                  <Select
                    value={preferences.defaultView}
                    onValueChange={(value: "list" | "grid") =>
                      setPreferences({ ...preferences, defaultView: value })
                    }
                  >
                    <SelectTrigger id="default-view">
                      <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="grid">Grid View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-tab">Default Tab</Label>
                  <Select
                    value={preferences.defaultTab}
                    onValueChange={(value: "all" | "today" | "upcoming") =>
                      setPreferences({ ...preferences, defaultTab: value })
                    }
                  >
                    <SelectTrigger id="default-tab">
                      <SelectValue placeholder="Select default tab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Task Reminders</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive notifications for upcoming and due tasks
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.enableReminders}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      notifications: {
                        ...preferences.notifications,
                        enableReminders: checked,
                      },
                    })
                  }
                />
              </div>
              
              {preferences.notifications.enableReminders && (
                <div className="space-y-2 pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                  <Label htmlFor="reminder-time">Default Reminder Time</Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={preferences.notifications.reminderTime}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        notifications: {
                          ...preferences.notifications,
                          reminderTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="space-y-1">
                  <Label>Weekly Summary</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get a weekly email summary of your productivity
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.enableSummary}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      notifications: {
                        ...preferences.notifications,
                        enableSummary: checked,
                      },
                    })
                  }
                />
              </div>
              
              {preferences.notifications.enableSummary && (
                <div className="space-y-2 pl-4 border-l-2 border-gray-100 dark:border-gray-800">
                  <Label htmlFor="summary-day">Send Summary On</Label>
                  <Select
                    value={preferences.notifications.summaryDay}
                    onValueChange={(value) =>
                      setPreferences({
                        ...preferences,
                        notifications: {
                          ...preferences.notifications,
                          summaryDay: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger id="summary-day">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                      <SelectItem value="saturday">Saturday</SelectItem>
                      <SelectItem value="sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="folders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Folder</CardTitle>
              <CardDescription>
                Add a new folder to organize your tasks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="folder-name">Folder Name</Label>
                  <Input
                    id="folder-name"
                    placeholder="e.g. Work, Personal, Shopping"
                    value={newFolder.name}
                    onChange={(e) =>
                      setNewFolder({ ...newFolder, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder-color">Color</Label>
                  <Input
                    id="folder-color"
                    type="color"
                    value={newFolder.color}
                    onChange={(e) =>
                      setNewFolder({ ...newFolder, color: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddFolder}>
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Folder
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Manage Folders</CardTitle>
              <CardDescription>
                Edit or delete your existing folders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {folders.length === 0 ? (
                <div className="text-center p-6 border border-dashed rounded-md">
                  <p className="text-gray-600 dark:text-gray-400">
                    No folders created yet. Create a new folder above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="flex items-center justify-between p-4 rounded-md border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: folder.color }}
                        ></div>
                        <span className="font-medium">{folder.name}</span>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {todos.filter((todo) => todo.folder === folder.id).length} tasks
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFolder(folder.id)}
                        disabled={["work", "personal", "shopping", "health"].includes(folder.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your app data and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setIsClearDataDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Clear Data Dialog */}
      <AlertDialog open={isClearDataDialogOpen} onOpenChange={setIsClearDataDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your tasks
              and custom folders from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleClearData();
              }}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Clearing...
                </>
              ) : (
                "Yes, clear all data"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}