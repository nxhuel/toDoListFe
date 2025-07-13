import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';
import { FormsModule, NgModel } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { SaveTask, Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, TaskForm, CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  isDarkMode!: boolean;

  tasks: Task[] = [];
  totalCount: number = 0;

  constructor(
    private renderer2: Renderer2,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

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

  // change completed
  toggleCompletion(task: Task, event: Event): void {
    const input = event.target as HTMLInputElement;
    const isCompleted = input.checked;

    task.completed = isCompleted;

    const updatedTask: SaveTask = {
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      completed: isCompleted,
      dueDate: task.dueDate,
      priority: task.priority,
      tags: task.tags,
    };

    this.taskService.editTask(updatedTask).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (err) => {
        console.error('Error actualizando estado:', err);
        task.completed = !isCompleted;
      },
    });
  }

  // udpate task
  // get isEditing(): boolean {
  //   return !!this.selectedTask;
  // }

  selectedTask?: Task;
  // selectedTask?: SaveTask;

  editTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  // al componente taskForm -> post / put
  handleFormSubmit(taskData: Task): void {
    if (taskData.taskId) {
      console.log('Editar tarea:', taskData);
      this.taskService.editTask(taskData).subscribe(() => {
        this.getTasks();
        this.selectedTask = undefined;
      });
    } else {
      // lógica de nueva creación
      console.log('Nueva tarea:', taskData);
      this.taskService.saveTask(taskData).subscribe(() => {
        this.getTasks();
        this.selectedTask = undefined;
      });
    }

    // Reiniciar form
    // this.selectedTask == null;
  }

  // delete task
  deleteTask(task: Task): void {
    console.log('Tarea a eliminar:', task); // asegurate que tenga taskId

    this.taskService.deleteTask(task.taskId).subscribe(() => {
      this.getTasks();
      alert('Tarea eliminada con éxito.');
      this.cdr.detectChanges(); // Forzar redibujo
    });
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
