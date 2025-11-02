import { Project, Member, Task, Settings, Alert } from './types'

// Utility functions
export const generateId = () => Math.random().toString(36).substr(2, 9)

export const createAlert = (
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string
): Alert => ({
  id: generateId(),
  type,
  title,
  message,
  timestamp: new Date()
})

// Validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export const validateProject = (project: Partial<Project>): string[] => {
  const errors: string[] = []
  
  if (!project.name?.trim()) {
    errors.push('El nombre del proyecto es requerido')
  }
  
  if (!project.description?.trim()) {
    errors.push('La descripción es requerida')
  }
  
  if (!project.startDate) {
    errors.push('La fecha de inicio es requerida')
  }
  
  if (!project.endDate) {
    errors.push('La fecha de fin es requerida')
  }
  
  if (project.startDate && project.endDate && project.startDate >= project.endDate) {
    errors.push('La fecha de fin debe ser posterior a la fecha de inicio')
  }
  
  return errors
}

export const validateMember = (member: Partial<Member>): string[] => {
  const errors: string[] = []
  
  if (!member.name?.trim()) {
    errors.push('El nombre es requerido')
  }
  
  if (!member.email?.trim()) {
    errors.push('El email es requerido')
  } else if (!validateEmail(member.email)) {
    errors.push('El email no es válido')
  }
  
  if (!member.role?.trim()) {
    errors.push('El rol es requerido')
  }
  
  if (!member.position?.trim()) {
    errors.push('La posición es requerida')
  }
  
  if (!member.phone?.trim()) {
    errors.push('El teléfono es requerido')
  } else if (!validatePhone(member.phone)) {
    errors.push('El teléfono no es válido')
  }
  
  if (!member.birthdate) {
    errors.push('La fecha de nacimiento es requerida')
  }
  
  return errors
}

export const validateTask = (task: Partial<Task>): string[] => {
  const errors: string[] = []
  
  if (!task.description?.trim()) {
    errors.push('La descripción es requerida')
  }
  
  if (!task.projectId) {
    errors.push('El proyecto es requerido')
  }
  
  if (!task.userId) {
    errors.push('El usuario asignado es requerido')
  }
  
  if (!task.dateline) {
    errors.push('La fecha límite es requerida')
  }
  
  return errors
}

export const validateSettings = (settings: Partial<Settings>): string[] => {
  const errors: string[] = []
  
  if (!settings.companyName?.trim()) {
    errors.push('El nombre de la empresa es requerido')
  }
  
  if (!settings.email?.trim()) {
    errors.push('El email es requerido')
  } else if (!validateEmail(settings.email)) {
    errors.push('El email no es válido')
  }
  
  if (!settings.timezone?.trim()) {
    errors.push('La zona horaria es requerida')
  }
  
  if (!settings.language?.trim()) {
    errors.push('El idioma es requerido')
  }
  
  return errors
}

// CRUD helper functions
export const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
  const now = new Date()
  return {
    ...projectData,
    id: generateId(),
    createdAt: now,
    updatedAt: now
  }
}

export const updateProject = (existingProject: Project, updates: Partial<Project>): Project => {
  return {
    ...existingProject,
    ...updates,
    updatedAt: new Date()
  }
}

export const createMember = (memberData: Omit<Member, 'userId' | 'createdAt' | 'updatedAt'>): Member => {
  const now = new Date()
  return {
    ...memberData,
    userId: generateId(),
    createdAt: now,
    updatedAt: now
  }
}

export const updateMember = (existingMember: Member, updates: Partial<Member>): Member => {
  return {
    ...existingMember,
    ...updates,
    updatedAt: new Date()
  }
}

export const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
  const now = new Date()
  return {
    ...taskData,
    id: generateId(),
    createdAt: now,
    updatedAt: now
  }
}

export const updateTask = (existingTask: Task, updates: Partial<Task>): Task => {
  return {
    ...existingTask,
    ...updates,
    updatedAt: new Date()
  }
}

// Simulation functions for loading states
export const simulateAsyncOperation = (duration: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration))
}