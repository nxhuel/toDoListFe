import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';
import { FormsModule, NgModel } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, TaskForm, CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  tasksTest = [
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

  isDarkMode!: boolean;

  tasks: Task[] = [];
  totalCount: number = 0;

  constructor(private renderer2: Renderer2, private taskService: TaskService) {}

  ngOnInit() {
    this.isDarkMode = document.body.classList.contains('dark-mode');

    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((response) => {
      console.log('Tasks fetched:', response);
      this.tasks = response.items;
      this.totalCount = response.totalCount;
    });
  }

  searchText: string = '';
  selectedStatus: string = 'Todas';
  selectedPriority: string = 'Todas las prioridades';

  get filteredTasks() {
    if (!this.tasks) return [];

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
        (this.selectedPriority === '🔴 Alta' && task.priority === 'High') ||
        (this.selectedPriority === '🟠 Media' && task.priority === 'Medium') ||
        (this.selectedPriority === '🟢 Baja' && task.priority === 'Low');

      return matchText && matchStatus && matchPriority;
    });
  }

  toggleTaskCompletion(task: any): void {
    task.completed = !task.completed;
  }

  // udpate task
  get isEditing(): boolean {
    return !!this.selectedTask;
  }

  selectedTask: any = null;

  editTask(task: any) {
    this.selectedTask = task;
  }

  handleFormSubmit(taskData: any) {
    if (taskData.id) {
      // lógica de actualización
      console.log('Editar tarea:', taskData);
    } else {
      // lógica de nueva creación
      console.log('Nueva tarea:', taskData);
    }

    // Reiniciar form
    this.selectedTask = null;
  }

  // delete task
  deleteTask(index: number): void {
    alert('Esta funcionalidad aún no está implementada.');
  }

  @ViewChild('titleCheck') titleCheck!: ElementRef;
  isChecked: boolean = false;

  eventCheck(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const titleElement = checkbox
      .closest('.card-header-container')
      ?.querySelector('h5');

    if (!titleElement) return;

    const isChecked = checkbox.checked;

    if (isChecked) {
      this.renderer2.setStyle(titleElement, 'text-decoration', 'line-through');
      this.renderer2.addClass(titleElement, 'title-checked');
    } else {
      this.renderer2.setStyle(titleElement, 'text-decoration', 'none');
      this.renderer2.removeClass(titleElement, 'title-checked');
    }
  }
}
