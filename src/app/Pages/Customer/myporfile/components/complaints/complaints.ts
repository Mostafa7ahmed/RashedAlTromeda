import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-complaints',
  imports: [CommonModule , RouterModule],
  templateUrl: './complaints.html',
  styleUrls: ['./complaints.scss' , "../suggestion/suggestion.scss"]
})
export class Complaints {
  expandedCard: number | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 65; 
    Math = Math;
  suggestions = Array(20).fill(0); 
  private router = inject(Router);
  languages = [
    { code: 0, name: 'جميع الحالات', color: '#F36B14' },
    { code: 1, name: 'مكتمل', color: '#6EC733' },
    { code: 2, name: 'يتم العمل عليه', color: '#949292' },
    { code: 3, name: 'تم الإلغاء', color: '#FF4F4F' }

  ];
  
  selectedLang = this.languages[0];
  dropdownOpen = false;
  selectLang(lang: any, event: MouseEvent) {
  event.stopPropagation();
  this.selectedLang = lang;
  this.dropdownOpen = false;
}
  progress = 0;
  audio = new Audio('Sound/ddddd.mp3');
  cards = [
    {
      id: 1,
      text: `أقترح عليك إنشاء منصة إلكترونية تعليمية متكاملة تستهدف طالب الجامعات...`,
      audio: 'Sound/ddddd.mp3',
      resources: [
        { name: 'Resource 1', size: '4 MB' },
        { name: 'Resource 2', size: '4 MB' },
        { name: 'Resource 3', size: '4 MB' }
      ],
      images: [
        'Image/house-repair.png',         'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png'
,         'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png'
 , 'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png',         'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png', 'Image/house-repair.png'

      ]
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      resources: [],
      images: []
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      resources: [],
      images: []
    }
  ];

  toggleCard(id: number) {
    this.expandedCard = this.expandedCard === id ? null : id;
  }

  openPopup() {
    this.router.navigate([{ outlets: { popup: ['addcomplaint'] } }]);
  }

  
  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }

    this.isPlaying = !this.isPlaying;

    this.audio.ontimeupdate = () => {
      this.currentTime = this.audio.currentTime;
      this.progress = (this.currentTime / this.audio.duration) * 100;
    };
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' + s : s}`;
  }
}
