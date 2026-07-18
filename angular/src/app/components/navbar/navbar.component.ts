import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X, Scale, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  mobileMenuOpen = false;
  theme = 'light';
  mounted = false;

  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly ScaleIcon = Scale;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;

  navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Practice Areas', href: '/practice-areas' },
    { name: 'Our Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mounted = true;
      this.theme = localStorage.getItem('theme') || 'light';
      this.applyTheme();
      this.isScrolled = window.scrollY > 20;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 20;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.theme);
    }
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
