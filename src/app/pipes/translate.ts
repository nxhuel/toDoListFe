import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translateTaskpriority' })
export class TranslateTaskpriorityPipe implements PipeTransform {
  transform(value: string | undefined): string {
    switch (value) {
      case 'low':
        return 'Baja';
      case 'medium':
        return 'Media';
      case 'high':
        return 'Alta';
      default:
        return 'Sin prioridad';
    }
  }
}
