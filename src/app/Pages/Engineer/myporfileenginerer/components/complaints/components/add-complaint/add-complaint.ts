import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveModeuls } from '../../../../../../../Shared/Modules/ReactiveForms.module';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Engineer {
  id: number;
  name: string;
  projects: number;
  color: string;
  image?: string;
}
@Component({
  selector: 'app-add-complaint',
  imports: [ReactiveModeuls ,  ],
  templateUrl: './add-complaint.html',
    styleUrls: [ './add-complaint.scss', '../../../../../../../Shared/CSS/popup.scss'],

})
export class AddComplaint {
 private router = inject(Router);

  images = signal<string[]>([]);
  uploadedFiles = signal<string[]>([]);
  audioUrl = signal<string | null>(null);
  isRecording = signal<boolean>(false);

  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  engineers = signal<Engineer[]>([
    { id: 1, name: 'م. أحمد', projects: 2000, color: '#FF6B6B' },
    { id: 2, name: 'م. محمد', projects: 1000, color: '#E5E5E5' },
    { id: 3, name: 'م. فاطمة', projects: 15300, color: '#FFD166' },
    { id: 4, name: 'م. مصطفى', projects: 1300, color: '#FF9D00' },
  ]);

  selectedEngineer = signal<Engineer | null>(null);
  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  selectEngineer(engineer: Engineer) {
    this.toggleDropdown();
    this.selectedEngineer.set(engineer);
  }
  closePopup() {
this.router.navigate(['/engineer', { outlets: { popup: null} }]);

  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const current = this.images();
    const newImages = Array.from(input.files).map((file) => URL.createObjectURL(file));
    this.images.set([...current, ...newImages]);
  }

  removeImage(index: number): void {
    const imgs = [...this.images()];
    URL.revokeObjectURL(imgs[index]);
    imgs.splice(index, 1);
    this.images.set(imgs);
  }


  onFileSelectedPDF(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const fileNames = Array.from(input.files).map((file) => file.name);

    this.uploadedFiles.update((prev) => [...prev, ...fileNames]);
  }

  removeFile(index: number): void {
    this.uploadedFiles.update((prev) => prev.filter((_, i) => i !== index));
  }
  // 🎤 تسجيل صوت
  async toggleRecording() {
    if (this.isRecording()) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        this.audioUrl.set(url);
      };

      this.mediaRecorder.start();
      this.isRecording.set(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('رجاءً اسمح بالوصول للميكروفون من المتصفح.');
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording.set(false);
  }

  deleteAudio() {
    if (this.audioUrl()) {
      URL.revokeObjectURL(this.audioUrl()!);
      this.audioUrl.set(null);
    }
  }
}
