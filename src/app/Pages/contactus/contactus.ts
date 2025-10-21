import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveModeuls } from '../../Shared/Modules/ReactiveForms.module';

@Component({
  selector: 'app-contactus',
  imports: [ReactiveModeuls],
  templateUrl: './contactus.html',
  styleUrl: './contactus.scss'
})
export class Contactus {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
