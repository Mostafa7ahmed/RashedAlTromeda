import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SuggestService } from '../../../../../Core/service/suggest-service';
import { ISuggestion, ISuggestionWithAudio } from '../../../../../Core/Interface/isuggestion';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-suggestion',
  imports: [CommonModule, RouterModule],
  templateUrl: './suggestion.html',
  styleUrl: './suggestion.scss'
})
export class Suggestion {
  expandedCard: number | null = null;
  Math = Math;
  SuggestionList = signal<ISuggestionWithAudio[]>([]);
  baseurl = environment.baseUrl;
  selectedImage: string | null = null; 
  
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalCount = signal<number>(0);
  moveNext = signal<boolean>(false);
  movePrevious = signal<boolean>(false);
  pageSize = 12;
  isLoading = signal<boolean>(false);
searchTerm = signal('');

  private router = inject(Router);
  private _suggest = inject(SuggestService);
  constructor() {
    effect(() => {
      this._suggest.refreshSuggestions();
      this.loadSuggestions();
    });
  }

  ngOnInit() {
    this.loadSuggestions();
  }
    openImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

  private loadSuggestions() {
    this._suggest.getSuggestion(this.currentPage(), this.pageSize).subscribe({
      next: (res) => {
        const suggestionsWithAudio: ISuggestionWithAudio[] = res.result.map(card => ({
          ...card,
          audio: card.voiceNoteUrl ? new Audio(this.baseurl + card.voiceNoteUrl) : null,
          isPlaying: false,
          progress: 0,
          currentTime: 0
        }));
        this.SuggestionList.set(suggestionsWithAudio);
         this.totalPages.set(res.totalPages);
        this.totalCount.set(res.totalCount);
        this.moveNext.set(res.moveNext);
        this.movePrevious.set(res.movePrevious);
        this.isLoading.set(false);  
      },
      error: console.error
    });
  }

  toggleCard(id: number) {
    this.expandedCard = this.expandedCard === id ? null : id;
  }

  openPopup() {
    this.router.navigate([{ outlets: { popup: ['addsuggest'] } }]);
  }

  togglePlay(card: any) {
    if (!card.audio) return;

    if (card.isPlaying) {
      card.audio.pause();
    } else {
      card.audio.play();
    }

    card.isPlaying = !card.isPlaying;

    card.audio.ontimeupdate = () => {
      card.currentTime = card.audio.currentTime;
      card.progress = (card.currentTime / card.audio.duration) * 100;
    };

    card.audio.onended = () => {
      card.isPlaying = false;
      card.currentTime = 0;
      card.progress = 0;
    };
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  }


    nextPage() {
    if (this.moveNext()) {
      this.currentPage.update(v => v + 1);
      this.loadSuggestions();
    }
  }
get pagesArray() {
  return Array.from({ length: this.totalPages() });
}
get visiblePages() {
  const total = this.totalPages();
  const current = this.currentPage();
  const windowSize = 4;

  let start = Math.max(1, current - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;

  if (end > total) {
    end = total;
    start = Math.max(1, end - windowSize + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
  prevPage() {
    if (this.movePrevious()) {
      this.currentPage.update(v => v - 1);
      this.loadSuggestions();
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.loadSuggestions();
  }
}
