export interface Task {
    taskId: number; 
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
    dueDate?: Date;
    priority?: 'Low' | 'Medium' | 'High';
    tags?: string[];
}

export interface TaskResponse {
    items: Task[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export interface SaveTask {
    taskId: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: Date;
    priority?: 'Low' | 'Medium' | 'High';
    tags?: string[];
}
