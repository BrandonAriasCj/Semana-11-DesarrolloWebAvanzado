"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { useAppState } from "@/lib/store"
import { BarChart3, Users, CheckCircle, Clock } from "lucide-react"

export default function DashboardPage() {
  const { state, dispatch } = useAppState()
  const { projects, members, tasks, ui } = state
  const [loadingStates, setLoadingStates] = useState({
    sync: false,
    delete: '',
    save: false,
    refresh: false
  })
  const [alerts, setAlerts] = useState<Array<{id: string, type: 'success' | 'destructive' | 'warning' | 'info', message: string}>>([])

  const simulateOperation = async (operation: string, duration = 2000) => {
    setLoadingStates(prev => ({ ...prev, [operation]: true }))
    await new Promise(resolve => setTimeout(resolve, duration))
    setLoadingStates(prev => ({ ...prev, [operation]: false }))
    
    // Add success alert
    const alertId = Math.random().toString(36).substr(2, 9)
    setAlerts(prev => [...prev, { 
      id: alertId, 
      type: 'success', 
      message: `${operation} completado exitosamente` 
    }])
    
    // Remove alert after 3 seconds
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    }, 3000)
  }

  const simulateDelete = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, delete: id }))
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoadingStates(prev => ({ ...prev, delete: '' }))
    
    const alertId = Math.random().toString(36).substr(2, 9)
    setAlerts(prev => [...prev, { 
      id: alertId, 
      type: 'warning', 
      message: 'Elemento eliminado correctamente' 
    }])
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    }, 3000)
  }

  // Calculate dynamic metrics
  const metrics = useMemo(() => {
    const totalProjects = projects.length
    const activeProjects = projects.filter(p => p.status === 'active').length
    const completedTasks = tasks.filter(t => t.status === 'completed').length
    const totalTasks = tasks.length
    const activeMembers = members.filter(m => m.isActive).length
    const totalHours = projects.reduce((acc, p) => acc + (p.progress * 8), 0) // Simulate hours
    
    return {
      totalProjects,
      activeProjects,
      completedTasks,
      totalTasks,
      activeMembers,
      totalHours: Math.round(totalHours),
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    }
  }, [projects, members, tasks])

  // Recent activities based on real data
  const recentActivities = useMemo(() => {
    const recentTasks = tasks
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map(task => {
        const member = members.find(m => m.userId === task.userId)
        const project = projects.find(p => p.id === task.projectId)
        return {
          user: member?.name || 'Usuario desconocido',
          action: task.status === 'completed' ? 'completó la tarea' : 'actualizó la tarea',
          task: task.description,
          time: `Actualizado ${new Date(task.updatedAt).toLocaleDateString()}`,
          avatar: member?.name?.[0] || 'U'
        }
      })
    
    return recentTasks
  }, [tasks, members, projects])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard de Proyectos</h1>
          <p className="text-slate-600">Gestiona tus proyectos y tareas con shadcn/ui - Datos en tiempo real</p>
          
          {/* Dynamic Alerts */}
          {alerts.length > 0 && (
            <div className="mt-4 space-y-2">
              {alerts.map((alert) => (
                <Alert key={alert.id} variant={alert.type}>
                  <AlertIcon variant={alert.type} />
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </div>

        {ui.loading && (
          <div className="flex justify-center items-center py-8">
            <Spinner size="lg" variant="primary" />
            <span className="ml-2">Cargando datos...</span>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos ({projects.length})</TabsTrigger>
            <TabsTrigger value="team">Equipo ({members.length})</TabsTrigger>
            <TabsTrigger value="tasks">Tareas ({tasks.length})</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Dynamic Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Proyectos</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalProjects}</div>
                  <p className="text-xs text-muted-foreground">
                    {metrics.activeProjects} activos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.completedTasks}</div>
                  <p className="text-xs text-muted-foreground">
                    {metrics.completionRate}% de {metrics.totalTasks} tareas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas Estimadas</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalHours}h</div>
                  <p className="text-xs text-muted-foreground">
                    Basado en progreso de proyectos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Miembros Activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.activeMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    de {members.length} miembros totales
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas actualizaciones basadas en datos reales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{activity.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-none">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.action} <span className="font-medium">"{activity.task}"</span>
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Proyectos</h2>
              <div className="flex gap-2">
                <Button onClick={() => simulateOperation('create')}>
                  {loadingStates.save ? (
                    <><Spinner size="sm" className="mr-2" /> Creando...</>
                  ) : (
                    <>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Nuevo Proyecto
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => simulateOperation('sync')} disabled={loadingStates.sync}>
                  {loadingStates.sync ? (
                    <><Spinner size="sm" className="mr-2" /> Sincronizando...</>
                  ) : (
                    'Sincronizar'
                  )}
                </Button>
                <Button variant="outline" onClick={() => simulateOperation('refresh')} disabled={loadingStates.refresh}>
                  {loadingStates.refresh ? (
                    <><Spinner size="sm" className="mr-2" /> Actualizando...</>
                  ) : (
                    'Actualizar'
                  )}
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge variant={
                        project.status === 'completed' ? 'default' :
                        project.status === 'active' ? 'secondary' : 'outline'
                      }>
                        {project.status === 'active' ? 'Activo' :
                         project.status === 'completed' ? 'Completado' :
                         project.status === 'planning' ? 'Planificación' : 'En pausa'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {project.teamMembers.length} miembros
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver detalles
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => simulateDelete(project.id)}
                            disabled={loadingStates.delete === project.id}
                          >
                            {loadingStates.delete === project.id ? (
                              <><Spinner size="sm" className="mr-1" /> Eliminando...</>
                            ) : (
                              'Eliminar'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Equipo</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="justify-start">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Filtrar por fecha
                </Button>
                <Button onClick={() => simulateOperation('create')}>
                  {loadingStates.save ? (
                    <><Spinner size="sm" className="mr-2" /> Creando...</>
                  ) : (
                    'Nuevo Miembro'
                  )}
                </Button>
              </div>
            </div>
            
            {/* Validation Alert */}
            {members.some(m => !m.email.includes('@')) && (
              <Alert variant="warning" className="mb-4">
                <AlertIcon variant="warning" />
                <AlertDescription>
                  Algunos miembros tienen emails inválidos. Revisa los datos antes de continuar.
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Miembros del Equipo</CardTitle>
                <CardDescription>Gestiona los miembros con datos completos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role} - {member.position}</p>
                          <p className="text-xs text-muted-foreground">{member.email} | {member.phone}</p>
                          <p className="text-xs text-muted-foreground">
                            Proyectos: {member.projectId.length} | 
                            Nacimiento: {new Date(member.birthdate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.isActive ? 'default' : 'secondary'}>
                          {member.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => simulateDelete(member.userId)}
                          disabled={loadingStates.delete === member.userId}
                        >
                          {loadingStates.delete === member.userId ? (
                            <><Spinner size="sm" className="mr-1" /> Eliminando...</>
                          ) : (
                            'Eliminar'
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tareas</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="justify-start">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Fecha límite
                </Button>
                <Button onClick={() => simulateOperation('create')}>
                  {loadingStates.save ? (
                    <><Spinner size="sm" className="mr-2" /> Creando...</>
                  ) : (
                    'Nueva Tarea'
                  )}
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Lista de Tareas</CardTitle>
                <CardDescription>Gestiona todas las tareas del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => {
                    const assignedMember = members.find(m => m.userId === task.userId)
                    const project = projects.find(p => p.id === task.projectId)
                    
                    return (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{task.description}</p>
                          <p className="text-sm text-muted-foreground">
                            Proyecto: {project?.name || 'Desconocido'} | 
                            Asignado a: {assignedMember?.name || 'Sin asignar'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Fecha límite: {new Date(task.dateline).toLocaleDateString()} |
                            Prioridad: {task.priority}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            task.status === 'completed' ? 'default' :
                            task.status === 'in-progress' ? 'secondary' : 'outline'
                          }>
                            {task.status === 'completed' ? 'Completada' :
                             task.status === 'in-progress' ? 'En progreso' :
                             task.status === 'review' ? 'En revisión' : 'Por hacer'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => simulateDelete(task.id)}
                            disabled={loadingStates.delete === task.id}
                          >
                            {loadingStates.delete === task.id ? (
                              <><Spinner size="sm" className="mr-1" /> Eliminando...</>
                            ) : (
                              'Eliminar'
                            )}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Pagination for tasks */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Mostrando 1-{tasks.length} de {tasks.length} tareas
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Siguiente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>Administra las preferencias y configuraciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Nombre de la Empresa</label>
                    <p className="text-sm text-muted-foreground">{state.settings.companyName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{state.settings.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Zona Horaria</label>
                    <p className="text-sm text-muted-foreground">{state.settings.timezone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Idioma</label>
                    <p className="text-sm text-muted-foreground">{state.settings.language}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tema</label>
                    <p className="text-sm text-muted-foreground">{state.settings.theme}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Notificaciones</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email</span>
                      <Badge variant={state.settings.notifications.email ? 'default' : 'secondary'}>
                        {state.settings.notifications.email ? 'Activado' : 'Desactivado'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Push</span>
                      <Badge variant={state.settings.notifications.push ? 'default' : 'secondary'}>
                        {state.settings.notifications.push ? 'Activado' : 'Desactivado'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Desktop</span>
                      <Badge variant={state.settings.notifications.desktop ? 'default' : 'secondary'}>
                        {state.settings.notifications.desktop ? 'Activado' : 'Desactivado'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Fecha de Backup</label>
                      <Button variant="outline" className="w-full justify-start">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date().toLocaleDateString()}
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Próxima Revisión</label>
                      <Button variant="outline" className="w-full justify-start">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={() => simulateOperation('save')} disabled={loadingStates.save}>
                      {loadingStates.save ? (
                        <><Spinner size="sm" className="mr-2" /> Guardando...</>
                      ) : (
                        'Guardar Configuración'
                      )}
                    </Button>
                    <Button variant="outline">Cancelar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}