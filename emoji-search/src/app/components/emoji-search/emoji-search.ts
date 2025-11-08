import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmojiService } from '../../services/emoji.service';
import { Emoji } from '../../models/emoji.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-emoji-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './emoji-search.html',
  styleUrl: './emoji-search.scss',
})
export class EmojiSearch implements OnInit {
  private readonly emojiService = inject(EmojiService);

  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal('');
  protected readonly emojis = signal<Emoji[]>([]);
  protected readonly filteredEmojis = signal<Emoji[]>([]);
  protected readonly categories = signal<string[]>([]);
  protected readonly clipboardNotification = signal<string | null>(null);

  ngOnInit(): void {
    firstValueFrom(this.emojiService.getEmojis()).then((res) => {
      this.emojis.set(res);
      this.filteredEmojis.set([...res]);
      this.categories.set(this.emojiService.getCategories(res));
    });
  }

  protected filterEmojis(): void {
    this.filteredEmojis.set(
      this.emojis().filter((emoji) => {
        const isSearchMatch = emoji.name.toLowerCase().includes(this.searchTerm().toLowerCase());

        let isCategoryMatch = true;

        if (this.selectedCategory()) {
          if (emoji.category !== this.selectedCategory()) {
            isCategoryMatch = false;
          }
        }

        if (isSearchMatch && isCategoryMatch) {
          return true;
        }

        return false;
      })
    );
  }

  protected onCategoryChange(): void {
    this.filterEmojis();
  }

  protected copyToClipboard(symbol: string): void {
    navigator.clipboard.writeText(symbol);
    this.clipboardNotification.set(`Copied ${symbol} to clipboard`);
    setTimeout(() => {
      this.clipboardNotification.set(null);
    }, 3000);
  }
}
