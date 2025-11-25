import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-about-me',
  imports: [RouterModule, Button],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  private readonly router = inject(Router);

  protected sectionTitle = 'About Me';
  protected introductionText = 'Learn more';
  protected p1 = `I'm a passionate software developer with a string interest in building efficient and user-friendly applications. My journey into coding started with a curiosity for technology and problem-solving.`;
  protected p2 = `Overt the years, I've worked on various projects, gaining experience in web and mobile development. I enjoy learning new technologies and improving my skills to create high-quality software solutions.`;
  protected p3 = `Currently, I focus on developing accesible and scalable applications, ensuring a seamless experience for users. I'm always eager to take on new challanges and ollaborate with like-minded individials.`;
  protected buttonText = 'View Projects';

  protected navigate(): void {
    this.router.navigate(['/portfolio']);
  }
}
