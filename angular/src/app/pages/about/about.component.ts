import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Award, Target, Scale, History } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  readonly AwardIcon = Award;
  readonly TargetIcon = Target;
  readonly ScaleIcon = Scale;
  readonly HistoryIcon = History;
}
