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
    this._suggest.getSuggestion(1,100).subscribe({
      next: (res) => {
        const suggestionsWithAudio: ISuggestionWithAudio[] = res.result.map(card => ({
          ...card,
          audio: card.voiceNoteUrl ? new Audio(this.baseurl + card.voiceNoteUrl) : null,
          isPlaying: false,
          progress: 0,
          currentTime: 0
        }));
        this.SuggestionList.set(suggestionsWithAudio);
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
}
