import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'task',
    loadComponent: () => import('./pages/task-list/task-list').then(m => m.TaskList)
  }  
];
