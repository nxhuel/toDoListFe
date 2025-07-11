export interface Task {
    id: number;
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
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
}
