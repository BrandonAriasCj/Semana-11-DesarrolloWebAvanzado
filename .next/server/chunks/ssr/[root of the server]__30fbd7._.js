module.exports = {

"[externals]/ [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js");

module.exports = mod;
}}),
"[project]/lib/store.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "AppProvider": (()=>AppProvider),
    "useAppState": (()=>useAppState)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// Initial data
const initialProjects = [
    {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Plataforma de comercio electrónico con Next.js',
        status: 'active',
        priority: 'high',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-15'),
        progress: 65,
        teamMembers: [
            '1',
            '2'
        ],
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
        teamMembers: [
            '3'
        ],
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
        teamMembers: [
            '1',
            '3'
        ],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-10-25')
    }
];
const initialMembers = [
    {
        userId: '1',
        role: 'Frontend Developer',
        name: 'María García',
        email: 'maria@example.com',
        position: 'Senior Developer',
        birthdate: new Date('1990-05-15'),
        phone: '+1234567890',
        projectId: [
            '1',
            '3'
        ],
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
        projectId: [
            '1'
        ],
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
        projectId: [
            '2',
            '3'
        ],
        isActive: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-11-01')
    }
];
const initialTasks = [
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
];
const initialSettings = {
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
};
const initialState = {
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
};
// Reducer
function appReducer(state, action) {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    loading: action.payload
                }
            };
        case 'ADD_ALERT':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    alerts: [
                        ...state.ui.alerts,
                        action.payload
                    ]
                }
            };
        case 'REMOVE_ALERT':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    alerts: state.ui.alerts.filter((alert)=>alert.id !== action.payload)
                }
            };
        case 'ADD_PROJECT':
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.payload
                ]
            };
        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map((project)=>project.id === action.payload.id ? action.payload : project)
            };
        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter((project)=>project.id !== action.payload)
            };
        case 'ADD_MEMBER':
            return {
                ...state,
                members: [
                    ...state.members,
                    action.payload
                ]
            };
        case 'UPDATE_MEMBER':
            return {
                ...state,
                members: state.members.map((member)=>member.userId === action.payload.userId ? action.payload : member)
            };
        case 'DELETE_MEMBER':
            return {
                ...state,
                members: state.members.filter((member)=>member.userId !== action.payload)
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task)=>task.id === action.payload.id ? action.payload : task)
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter((task)=>task.id !== action.payload)
            };
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: action.payload
            };
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
            };
        default:
            return state;
    }
}
// Context
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AppProvider({ children }) {
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/store.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
function useAppState() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}
}}),
"[externals]/ [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/work-async-storage.external.js");

module.exports = mod;
}}),
"[externals]/ [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/action-async-storage.external.js");

module.exports = mod;
}}),
"[externals]/ [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/work-unit-async-storage.external.js");

module.exports = mod;
}}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__30fbd7._.js.map