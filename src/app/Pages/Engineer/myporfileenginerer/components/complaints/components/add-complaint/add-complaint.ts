import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveModeuls } from '../../../../../../../Shared/Modules/ReactiveForms.module';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingUser } from '../../../../../../../Core/Interface/icomplaint';
import { Streem } from '../../../../../../../Core/service/streem';
import { SweetAlert } from '../../../../../../../Core/service/sweet-alert';
import { environment } from '../../../../../../../../environments/environment';
import { Complaint } from '../../../../../../../Core/service/complaint';
import { TranslatePipe } from '@ngx-translate/core';

interface Engineer {
  id: number;
  name: string;
  projects: number;
  color: string;
  image?: string;
}
@Component({
  selector: 'app-add-complaint',
  imports: [ReactiveModeuls ,TranslatePipe  ],
  templateUrl: './add-complaint.html',
    styleUrls: [ './add-complaint.scss', '../../../../../../../Shared/CSS/popup.scss'],

})
export class AddComplaint {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private _complaint = inject(Complaint);
  private _streem = inject(Streem);
  private _alert = inject(SweetAlert);

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  engineers = signal<BookingUser[]>([]);
  selectedEngineer = signal<BookingUser | null>(null);
  isOpen = signal(false);
  selectedBooking: any | null = null;
 baseUrl = environment.baseUrl
  images = signal<{ id?: number; url?: string; isUploading: boolean }[]>([]);
  uploadedFiles = signal<{ id?: number; name: string; url?: string; isUploading: boolean }[]>([]);

  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  isRecording = signal<boolean>(false);
  audioUrl = signal<string | null>(null);
  uploadedVoiceUrl = signal<string | null>(null);
  isUploadingAudio = signal(false);

  ngOnInit() {
    this.loadEngineers();
  }

  loadEngineers() {
    this._complaint.getBooing().subscribe({
      next: (res) => {
        if (res.success && res.result) this.engineers.set(res.result);
      },
      error: (err) => console.error('Error fetching engineers', err),
    });
  }

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  selectEngineer(engineer: BookingUser) {
    this.selectedEngineer.set(engineer);
    this.isOpen.set(false);
  }

  selectBooking(booking: any) {
    this.selectedBooking = booking;
  }

  closePopup() {
this.router.navigate(['/engineer', { outlets: { popup: null } }]);
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    Array.from(input.files).forEach((file) => {
      const tempImg = { isUploading: true };
      this.images.update((prev) => [...prev, tempImg]);

      this._streem.uploadStreem(file).subscribe({
        next: (res) => {
          if (res.success && res.result) {
            this.images.update((prev) =>
              prev.map((img) =>
                img === tempImg
                  ? { id: res.result.id, url: res.result.url, isUploading: false }
                  : img
              )
            );
          }
        },
        error: () => this.images.update((prev) => prev.filter((img) => img !== tempImg)),
      });
    });
  }

  removeImage(index: number) {
    const imgs = [...this.images()];
    const img = imgs[index];
    if (img?.id) {
      this._streem.deleteStreem(img.id).subscribe({
        next: () => {
          imgs.splice(index, 1);
          this.images.set(imgs);
        },
      });
    }
  }

  onFileSelectedPDF(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    Array.from(input.files).forEach((file) => {
      const tempFile = { name: file.name, isUploading: true };
      this.uploadedFiles.update((prev) => [...prev, tempFile]);

      this._streem.uploadStreem(file).subscribe({
        next: (res) => {
          if (res.success && res.result) {
            this.uploadedFiles.update((prev) =>
              prev.map((f) =>
                f === tempFile
                  ? { id: res.result.id, name: file.name, url: res.result.url, isUploading: false }
                  : f
              )
            );
          }
        },
        error: () =>
          this.uploadedFiles.update((prev) => prev.filter((f) => f !== tempFile)),
      });
    });
  }

  removeFile(index: number) {
    const files = [...this.uploadedFiles()];
    const file = files[index];
    if (file?.id) {
      this._streem.deleteStreem(file.id).subscribe({
        next: () => {
          files.splice(index, 1);
          this.uploadedFiles.set(files);
        },
      });
    }
  }

  async toggleRecording() {
    if (this.isRecording()) this.stopRecording();
    else await this.startRecording();
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        this.audioUrl.set(url);
        this.uploadVoice(blob);
      };

      this.mediaRecorder.start();
      this.isRecording.set(true);
    } catch {
      alert('رجاءً اسمح بالوصول للميكروفون من المتصفح.');
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording.set(false);
  }

  uploadVoice(file: Blob) {
    this.isUploadingAudio.set(true);
    const voiceFile = new File([file], 'voice.mp3', { type: 'audio/mp3' });
    this._streem.uploadStreem(voiceFile).subscribe({
      next: (res) => {
        if (res.success && res.result?.url) this.uploadedVoiceUrl.set(res.result.url);
      },
      error: () => this.isUploadingAudio.set(false),
      complete: () => this.isUploadingAudio.set(false),
    });
  }

  deleteAudio() {
    if (this.audioUrl()) URL.revokeObjectURL(this.audioUrl()!);
    this.audioUrl.set(null);
    this.uploadedVoiceUrl.set(null);
  }

  addComplaint() {

    const data = {
      title: this.form.value.title,
      description: this.form.value.description,
      orderId: this.selectedBooking.id,
      userId: this.selectedEngineer()?.userId ?? 0,
      voiceNoteUrl: this.uploadedVoiceUrl() ?? '',
      fileUrls: this.uploadedFiles().filter((f) => !!f.url).map((f) => f.url!),
      photoUrls: this.images().filter((img) => !!img.url).map((img) => img.url!),
    };
 


    this._complaint.AddComplaint(data).subscribe({
      next: (res) => {
        if (res.success) {
          this._alert.toast('تم إضافة الشكوى بنجاح', 'success');
          this.closePopup();
          this._complaint.notifyRefresh();
        }
      },
      error: (err) => this._alert.toast(err.error?.message || 'حدث خطأ', 'error'),
    });
     
  }
}
