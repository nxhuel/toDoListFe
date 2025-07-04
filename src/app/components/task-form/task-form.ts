import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  today: Date = new Date();
  minDate: string = this.today.toISOString().split('T')[0]; // Format YYYY-MM-DD

  taskForm: FormGroup;
  title: FormControl;
  description: FormControl;
  completed: FormControl;
  createdAt: FormControl;
  updatedAt: FormControl;
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
    this.createdAt = new FormControl(new Date());
    this.updatedAt = new FormControl(new Date());
    this.dueDate = new FormControl(null, Validators.required);
    this.priority = new FormControl('medium', Validators.required);
    this.tags = new FormControl([]);

    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      dueDate: this.dueDate,
      priority: this.priority,
      tags: this.tags,
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form Submitted!', this.taskForm.value);
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
}
