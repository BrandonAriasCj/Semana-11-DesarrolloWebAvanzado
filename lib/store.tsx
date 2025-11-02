"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { AppState, Project, Member, Task, Settings, Alert } from './types'

// Initial data
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con Next.js',
    status: 'active',
    priority: 'high',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-06-15'),
    progress: 65,
    teamMembers: ['1', '2'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Aplicación móvil con React Native',
    status: 'active',
    priority: 'medium',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-08-01'),
    progress: 90,
    teamMembers: ['3'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-10-30')
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    description: 'Panel de análisis con visualizaciones',
    status: 'planning',
    priority: 'low',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-09-01'),
    progress: 20,
    teamMembers: ['1', '3'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-10-25')
  }
]

const initialMembers: Member[] = [
  {
    userId: '1',
    role: 'Frontend Developer',
    name: 'María García',
    email: 'maria@example.com',
    position: 'Senior Developer',
    birthdate: new Date('1990-05-15'),
    phone: '+1234567890',
    projectId: ['1', '3'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-01')
  },
  {
    userId: '2',
    role: 'Backend Developer',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    position: 'Lead Developer',
    birthdate: new Date('1988-08-22'),
    phone: '+1234567891',
    projectId: ['1'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-01')
  },
  {
    userId: '3',
    role: 'UI/UX Designer',
    name: 'Ana López',
    email: 'ana@example.com',
    position: 'Senior Designer',
    birthdate: new Date('1992-12-10'),
    phone: '+1234567892',
    projectId: ['2', '3'],
    isActive: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-01')
  }
]

const initialTasks: Task[] = [
  {
    id: '1',
    description: 'Implementar autenticación de usuarios',
    projectId: '1',
    status: 'in-progress',
    priority: 'high',
    userId: '1',
    dateline: new Date('2024-11-15'),
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: '2',
    description: 'Diseñar pantalla de perfil',
    projectId: '2',
    status: 'todo',
    priority: 'medium',
    userId: '3',
    dateline: new Date('2024-11-20'),
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-10-30')
  },
  {
    id: '3',
    description: 'Configurar CI/CD pipeline',
    projectId: '1',
    status: 'completed',
    priority: 'high',
    userId: '2',
    dateline: new Date('2024-11-10'),
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-11-01')
  }
]

const initialSettings: Settings = {
  companyName: 'Mi Empresa',
  email: 'admin@miempresa.com',
  timezone: 'America/Mexico_City',
  language: 'es',
  theme: 'custom',
  notifications: {
    email: true,
    push: true,
    desktop: false
  }
}

const initialState: AppState = {
  projects: initialProjects,
  members: initialMembers,
  tasks: initialTasks,
  settings: initialSettings,
  ui: {
    loading: false,
    alerts: [],
    currentPage: {
      projects: 1,
      members: 1,
      tasks: 1
    },
    pageSize: 10
  }
}

// Action types
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'REMOVE_ALERT'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_MEMBER'; payload: Member }
  | { type: 'UPDATE_MEMBER'; payload: Member }
  | { type: 'DELETE_MEMBER'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_SETTINGS'; payload: Settings }
  | { type: 'SET_CURRENT_PAGE'; payload: { entity: 'projects' | 'members' | 'tasks'; page: number } }

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, loading: action.payload } }
    
    case 'ADD_ALERT':
      return { ...state, ui: { ...state.ui, alerts: [...state.ui.alerts, action.payload] } }
    
    case 'REMOVE_ALERT':
      return { 
        ...state, 
        ui: { 
          ...state.ui, 
          alerts: state.ui.alerts.filter(alert => alert.id !== action.payload) 
        } 
      }
    
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        )
      }
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload)
      }
    
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] }
    
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(member =>
          member.userId === action.payload.userId ? action.payload : member
        )
      }
    
    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter(member => member.userId !== action.payload)
      }
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] }
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      }
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    
    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.payload }
    
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        ui: {
          ...state.ui,
          currentPage: {
            ...state.ui.currentPage,
            [action.payload.entity]: action.payload.page
          }
        }
      }
    
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider')
  }
  return context
}