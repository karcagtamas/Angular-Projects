import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-introduction',
  imports: [RouterModule, Button],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction {
  private readonly router = inject(Router);

  protected greetingText = 'Hello! My name is';
  protected fullName = 'Asd Dsa';
  protected roleText = 'I build software solutions';
  protected introductionText = `I'm a software developer focused on creating exceptional digital experiences.
    Passionate about everything related to technology, I create user-friendly and efficient applications.
    I love tacklign complex problems and delivering high-quality work.`;
  protected aboutMeButtonText = 'About Me';

  protected navigate(): void {
    this.router.navigate(['/about-me']);
  }
}
