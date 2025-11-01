import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IComplaintWithAudio } from '../../../../../Core/Interface/icomplaint';
import { environment } from '../../../../../../environments/environment';
import { Complaint } from '../../../../../Core/service/complaint';

@Component({
  selector: 'app-complaints',
  imports: [CommonModule, RouterModule],
  templateUrl: './complaints.html',
  styleUrls: ['./complaints.scss', '../suggestion/suggestion.scss']
})
export class Complaints {
  private router = inject(Router);
  private _complaintService = inject(Complaint);

  ComplaintList = signal<IComplaintWithAudio[]>([]);
  searchTerm = signal('');
  expandedCard: number | null = null;
  selectedImage: string | null = null;
  dropdownOpen = false;
  Math = Math;
  baseurl = environment.baseUrl;
  timeoutId: any;

  status = [
    { code: -1, name: 'جميع الحالات', color: '#b6d83bff' },
    { code: 0, name: 'قيد الانتظار', color: '#F36B14' },
    { code: 1, name: 'يتم العمل عليه', color: '#949292' },
    { code: 2, name: 'مكتمل', color: '#6EC733' },
    { code: 3, name: 'تم الإلغاء', color: '#FF4F4F' }
  ];
  selectedstatu = this.status[0];

  constructor() {
    effect(() => {
      this._complaintService.refreshComplaints();
      this.loadComplaints();
    });
  }

  ngOnInit() {
    this.loadComplaints();
  }

  getStatusByCode(code: number) {
    return this.status.find(s => s.code === code) ?? { name: 'غير معروف', color: '#ccc' };
  }
onSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(() => {
    this.searchTerm.set(value);
    this.loadComplaints();
  }, 500); 
}
  selectstatus(lang: any, event: MouseEvent) {
    event.stopPropagation();
    this.selectedstatu = lang;
    this.dropdownOpen = false;
  }

  openImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

  toggleCard(id: number) {
    this.expandedCard = this.expandedCard === id ? null : id;
  }

  openPopup() {
    this.router.navigate([{ outlets: { popup: ['addcomplaint'] } }]);
  }

  private loadComplaints() {
    this._complaintService.getComplaint(1, 100  , this.searchTerm()).subscribe({
      next: (res) => {
        const complaintsWithAudio: IComplaintWithAudio[] = res.result.map(card => ({
          ...card,
          audio: card.voiceNoteUrl ? new Audio(this.baseurl + card.voiceNoteUrl) : null,
          isPlaying: false,
          progress: 0,
          currentTime: 0
        }));
        this.ComplaintList.set(complaintsWithAudio);
      },
      error: console.error
    });
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
