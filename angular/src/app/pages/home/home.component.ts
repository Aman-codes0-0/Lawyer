import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowRight, Scale, Shield, Users, Award, Briefcase, FileText, CheckCircle2, Gavel, Home, Building, Calculator } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly ArrowRightIcon = ArrowRight;
  readonly ScaleIcon = Scale;
  readonly ShieldIcon = Shield;
  readonly UsersIcon = Users;
  readonly AwardIcon = Award;
  readonly BriefcaseIcon = Briefcase;
  readonly FileTextIcon = FileText;
  readonly CheckCircle2Icon = CheckCircle2;
  readonly GavelIcon = Gavel;
  readonly HomeIcon = Home;
  readonly BuildingIcon = Building;
  readonly CalculatorIcon = Calculator;

  stats = [
    { icon: Award, label: "Years Experience", stat: "20+" },
    { icon: Briefcase, label: "Cases Handled", stat: "5000+" },
    { icon: Scale, label: "Success Rate", stat: "98%" },
    { icon: Users, label: "Expert Lawyers", stat: "10+" },
  ];

  practiceAreas = [
    { title: "Criminal Law", icon: Gavel },
    { title: "Civil Litigation", icon: Scale },
    { title: "Family Law", icon: Users },
    { title: "Property Law", icon: Home },
    { title: "Corporate Law", icon: Building },
    { title: "Tax Law", icon: Calculator },
  ];

  features = [
    "Experienced Lawyers",
    "Personalized Strategy",
    "Transparent Fees",
    "Confidential Consultation",
    "Proven Results"
  ];
}
