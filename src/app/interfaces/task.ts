export interface Task {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
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
