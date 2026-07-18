import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Scale, Mail, Phone, MapPin, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly ScaleIcon = Scale;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly MapPinIcon = MapPin;
  readonly ArrowRightIcon = ArrowRight;

  currentYear = new Date().getFullYear();

  socials = ['Twitter', 'LinkedIn', 'Facebook'];

  quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Practice Areas', href: '/practice-areas' },
    { name: 'Blog & News', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  practiceAreas = [
    'Corporate Law',
    'Family Law',
    'Criminal Defense',
    'Property Disputes',
    'Intellectual Property',
  ];
}
