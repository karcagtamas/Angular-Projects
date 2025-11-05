import { Component, input, OnInit, signal } from '@angular/core';
import { PostDTO } from '../../services/post.service';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  readonly post = input.required<PostDTO>();
  protected readonly randomPhotoUrl = signal<string | null>(null);

  ngOnInit(): void {
    this.generateRandomPhoto();
  }

  private generateRandomPhoto(): void {
    const seed = this.generateRandomNumber(1000);
    this.randomPhotoUrl.set(`https://picsum.photos/seed/${seed}/50`);
  }

  private generateRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
