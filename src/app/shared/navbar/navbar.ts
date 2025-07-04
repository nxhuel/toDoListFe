import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isDark = false;

  ngOnInit() {
    const currentTheme = localStorage.getItem('bsTheme') || 'dark';
    this.isDark = currentTheme === 'dark';
    document.documentElement.setAttribute('data-bs-theme', currentTheme);
  }

  toggleTheme(event: Event) {
    this.isDark = (event.target as HTMLInputElement).checked;
    const theme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('bsTheme', theme);
  }

  toggleThemeDropdown(event: Event) {
    event.preventDefault(); // evitar que el enlace navegue
    this.isDark = !this.isDark;
    const theme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('bsTheme', theme);
  }
}
