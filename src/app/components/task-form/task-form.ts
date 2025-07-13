import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SaveTask, Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm implements OnChanges {
  @Input() taskToEdit?: SaveTask;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);

    if (changes['taskToEdit'] && this.taskToEdit) {
      this.fillForm(this.taskToEdit);
    }
  }

  fillForm(task: any): void {
    this.taskForm.patchValue({
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      completed: task.completed,
      dueDate: task.dueDate,
      priority: task.priority,
      tags: task.tags || [],
    });
  }

  today: Date = new Date();
  minDate: string = this.today.toISOString().split('T')[0]; // Format YYYY-MM-DD

  taskForm: FormGroup;
  title: FormControl;
  description: FormControl;
  completed: FormControl;
  dueDate: FormControl;
  priority: FormControl;
  tags: FormControl;

  constructor() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.description = new FormControl('');
    this.completed = new FormControl(false, Validators.required);
    this.dueDate = new FormControl(null, Validators.required);
    this.priority = new FormControl('Medium', Validators.required);
    this.tags = new FormControl([]);

    this.taskForm = new FormGroup({
      taskId: new FormControl(null),
      title: this.title,
      description: this.description,
      completed: this.completed,
      dueDate: this.dueDate,
      priority: this.priority,
      tags: this.tags,
    });
  }

  @Output() formSubmitted = new EventEmitter<any>();

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('ID en el form:', this.taskForm.get('taskId')?.value);
      console.log('Form Submitted!', this.taskForm.value);
      
      this.formSubmitted.emit({ ...taskData });
      // this.resetForm();
    } else {
      console.log('Form not valid');
    }
  }

  addTag(tagInput: HTMLInputElement): void {
    const value = tagInput.value.trim();

    if (value) {
      const currentTags = this.tags.value as string[];

      if (!currentTags.includes(value)) {
        const updatedTags = [...currentTags, value];
        this.tags.setValue(updatedTags);
      }
    }

    tagInput.value = '';
  }

  removeTag(tagToRemove: string): void {
    const currentTags = this.tags.value as string[];
    const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
    this.tags.setValue(updatedTags);
  }

  resetForm() {
    this.taskForm.reset();
    this.tags.setValue([]);
  }
}
