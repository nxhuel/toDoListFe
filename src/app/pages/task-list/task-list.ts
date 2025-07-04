import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, TaskForm, CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  tasks = [
    {
      title: 'Task 1',
      description: 'Description for Task 1',
      completed: false,
      createdAt: '2025-06-22',
      updatedAt: '2025-06-25',
      dueDate: '2025-08-22',
      priority: 'medium',
      tags: ['work', 'urgent'],
    },
    {
      title: 'Task 2',
      description: 'Description for Task 2',
      completed: true,
      createdAt: '2025-04-06',
      updatedAt: '',
      dueDate: '2025-05-12',
      priority: 'low',
      tags: ['personal'],
    },
    {
      title: 'Task 3',
      description: 'Description for Task 3',
      completed: true,
      createdAt: '2025-04-06',
      updatedAt: '',
      dueDate: '2025-05-12',
      priority: 'low',
      tags: ['personal'],
    },
    {
      title: 'Task 4',
      description: 'Description for Task 4',
      completed: true,
      createdAt: '2025-04-06',
      updatedAt: '',
      dueDate: '2025-05-12',
      priority: 'low',
      tags: ['personal'],
    },
    {
      title: 'Task 5',
      description: 'Description for Task 5',
      completed: true,
      createdAt: '2025-04-06',
      updatedAt: '',
      dueDate: '2025-05-12',
      priority: 'low',
      tags: ['personal'],
    },
  ];

  constructor() {}

  searchText: string = '';
  selectedStatus: string = 'Todas';
  selectedPriority: string = 'Todas las prioridades';

  get filteredTasks() {
    return this.tasks.filter((task) => {
      const matchText = task.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      const matchStatus =
        this.selectedStatus === 'Todas' ||
        (this.selectedStatus === 'Pendientes' && !task.completed) ||
        (this.selectedStatus === 'Completadas' && task.completed);

      const matchPriority =
        this.selectedPriority === 'Todas las prioridades' ||
        (this.selectedPriority === '🔴 Alta' && task.priority === 'high') ||
        (this.selectedPriority === '🟠 Media' && task.priority === 'medium') ||
        (this.selectedPriority === '🟢 Baja' && task.priority === 'low');

      return matchText && matchStatus && matchPriority;
    });
  }

  toggleTaskCompletion(task: any): void {
    task.completed = !task.completed;
  }

  deleteTask(index: number): void {
    alert('Esta funcionalidad aún no está implementada.');
  }
}
