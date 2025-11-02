import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Streem } from '../../../../../../../Core/service/streem';
import { SuggestService } from '../../../../../../../Core/service/suggest-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlert } from '../../../../../../../Core/service/sweet-alert';
import { ReactiveModeuls } from '../../../../../../../Shared/Modules/ReactiveForms.module';
import { IAddsuggest } from '../../../../../../../Core/Interface/isuggestion';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-addsuggest',
  standalone: true,
  imports: [CommonModule, ReactiveModeuls],
  templateUrl: './addsuggest.html',
  styleUrls: ['./addsuggest.scss', '../../../../../../../Shared/CSS/popup.scss'],
})
export class Addsuggest {
  private router = inject(Router);
  private _streem = inject(Streem);
  private _suggest = inject(SuggestService);
  private fb = inject(FormBuilder);
  private _alert = inject(SweetAlert); // اختياري لو عندك خدمة توست
  baseUrl = environment.baseUrl;
images = signal<{ id?: number; url?: string; isUploading: boolean }[]>([]);
  uploadedFiles = signal<{ id?: number; name: string; url?: string; isUploading: boolean }[]>([]);
  isUploading = signal<boolean>(false);
  isUploadingImage = signal(false); // ✅ مؤشر التحميل

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  closePopup() {
this.router.navigate(['/engineer', { outlets: { popup: null } }]);
  }

onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const files = Array.from(input.files);

  files.forEach((file) => {
    const tempImg = { isUploading: true };
    this.images.update((prev) => [...prev, tempImg]);

    this._streem.uploadStreem(file).subscribe({
      next: (res) => {
        if (res.success && res.result) {
          this.images.update((prev) =>
            prev.map((img) =>
              img === tempImg
                ? {
                    id: res.result.id,
                    url: res.result.url,
                    isUploading: false,
                  }
                : img
            )
          );
        }
      },
      error: (err) => {
        console.error('Upload image error:', err);
        this.images.update((prev) => prev.filter((img) => img !== tempImg));
      },
    });
  });
}
  removeImage(index: number): void {
    const imgs = [...this.images()];
    const img = imgs[index];
    if (img?.id) {
      this._streem.deleteStreem(img.id).subscribe({
        next: () => {
          imgs.splice(index, 1);
          this.images.set(imgs);
        },
        error: (err) => console.error('Delete image error:', err),
      });
    }
  }

  onFileSelectedPDF(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);

    files.forEach((file) => {
      const tempFile = { name: file.name, isUploading: true };
      this.uploadedFiles.update((prev) => [...prev, tempFile]);

      this._streem.uploadStreem(file).subscribe({
        next: (res) => {
          if (res.success && res.result) {
            this.uploadedFiles.update((prev) =>
              prev.map((f) =>
                f === tempFile
                  ? {
                    id: res.result.id,
                    name: file.name,
                    url: res.result.url,
                    isUploading: false,
                  }
                  : f
              )
            );
          }
        },
        error: (err) => {
          console.error('Upload file error:', err);
          // نحذف الملف اللي فشل رفعه
          this.uploadedFiles.update((prev) => prev.filter((f) => f !== tempFile));
        },
      });
    });
  }

  removeFile(index: number): void {
    const files = [...this.uploadedFiles()];
    const file = files[index];
    if (file?.id) {
      this._streem.deleteStreem(file.id).subscribe({
        next: () => {
          files.splice(index, 1);
          this.uploadedFiles.set(files);
        },
        error: (err) => console.error('Delete file error:', err),
      });
    }
  }
  // 🎤 تسجيل صوت
private mediaRecorder!: MediaRecorder;
private audioChunks: Blob[] = [];

isRecording = signal<boolean>(false);
isUploadingAudio = signal<boolean>(false);
audioUrl = signal<string | null>(null);
uploadedVoiceUrl = signal<string | null>(null); // ده اللي هيتبعت في البودي

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
      if (e.data.size > 0) this.audioChunks.push(e.data);
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.audioChunks, { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      this.audioUrl.set(url);
      this.uploadVoice(blob); // ⬅️ هنا نرفع الصوت تلقائيًا بعد التسجيل
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

uploadVoice(file: Blob) {
  this.isUploadingAudio.set(true);

  const voiceFile = new File([file], 'voice.mp3', { type: 'audio/mp3' });

  this._streem.uploadStreem(voiceFile).subscribe({
    next: (res) => {
      if (res.success && res.result?.url) {
        this.uploadedVoiceUrl.set(res.result.url);
      }
    },
    error: (err) => {
      console.error('Upload voice error:', err);
      this.isUploadingAudio.set(false);
    },
    complete: () => {
      this.isUploadingAudio.set(false);
    },
  });
}

deleteAudio() {
  if (this.audioUrl()) URL.revokeObjectURL(this.audioUrl()!);
  this.audioUrl.set(null);
  this.uploadedVoiceUrl.set(null);
}

  addSuggest(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._alert.toast('من فضلك املأ كل الحقول المطلوبة', 'error');
      return;
    }

    const data: IAddsuggest = {
      title: this.form.value.title,
      description: this.form.value.description,
  voiceNoteUrl: this.uploadedVoiceUrl() ?? undefined, // ✅ هنا التحويل الصحيح

      fileUrls: this.uploadedFiles()
        .filter((f) => !!f.url) 
        .map((f) => f.url as string),
      photoUrls: this.images()
    .filter((img) => !img.isUploading && img.url)
    .map((img) => img.url!),
    };

    this._suggest.Addsuggest(data).subscribe({
      next: (res) => {
        if (res.success) {
          this._alert.toast(res.message || 'تم إضافة الاقتراح بنجاح', 'success');
              this._suggest.notifyRefresh(); // ✅ علّم الكومبوننت الأساسي إنه يحدّث نفسه

          this.closePopup();
        }
      },
      error: (err) => {
        this._alert.toast(err.error?.message || 'حدث خطأ أثناء الإضافة', 'error');
      },
    });
  }

}
