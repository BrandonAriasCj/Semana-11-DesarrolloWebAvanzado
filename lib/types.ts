export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  endDate: Date;
  progress: number;
  teamMembers: string[]; // Member IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  userId: string;
  role: string;
  name: string;
  email: string;
  position: string;
  birthdate: Date;
  phone: string;
  projectId: string[];
  isActive: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  description: string;
  projectId: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId: string; // Assigned member
  dateline: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  companyName: string;
  email: string;
  timezone: string;
  language: string;
  theme: 'light' | 'dark' | 'custom';
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
}

export interface Alert {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export interface AppState {
  projects: Project[];
  members: Member[];
  tasks: Task[];
  settings: Settings;
  ui: {
    loading: boolean;
    alerts: Alert[];
    currentPage: {
      projects: number;
      members: number;
      tasks: number;
    };
    pageSize: number;
  };
}