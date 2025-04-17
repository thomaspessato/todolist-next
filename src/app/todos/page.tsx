import { TodoList } from '@/components/todos/TodoList';

export default function TodosPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-xs font-medium mb-3">
            Organize Your Life
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Manage Your Tasks Effortlessly
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create folders, organize tasks, and track your progress all in one place.
            Stay focused and get things done with our intuitive task management system.
          </p>
        </div>
      </div>
      
      <TodoList />
    </div>
  );
}