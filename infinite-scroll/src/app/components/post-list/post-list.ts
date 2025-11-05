import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { Post } from '../post/post';
import { PostDTO, PostService } from '../../services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, Post],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit {
  private readonly postService = inject(PostService);

  protected readonly posts = signal<PostDTO[]>([]);
  protected readonly loading = signal(false);
  protected readonly page = signal(1);
  protected readonly limit = signal(10);
  protected readonly error = signal('');

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.loading.set(true);

    firstValueFrom(this.postService.getPosts(this.page(), this.limit()))
      .then((res) => {
        if (res && res.length) {
          this.posts.update((current) => {
            return [...current, ...res];
          });
          this.page.update((current) => {
            return current + 1;
          });
          this.error.set('');
        }
      })
      .catch((err) => {
        this.handleError(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  private handleError(error: unknown): void {
    console.error('Error fetching posts:', error);
    this.error.set('Something went wrong while fetching the posts. Please try again later!');
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log('ALMA');
    if (window.innerHeight + window.screenY >= document.body.scrollHeight && !this.loading()) {
      this.loadPosts();
    }
  }
}
