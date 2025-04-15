export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  folderId: string;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export type TabType = 'all' | 'pending' | 'completed';