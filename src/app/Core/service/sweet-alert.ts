import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlert {
  
  constructor() { }

  success(message: string, title: string = 'Success') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'OK',
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'Close',
    });
  }

  warning(message: string, title: string = 'Warning') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'Got it',
    });
  }

  confirm(
    message: string,
    title: string = 'Are you sure?',
    confirmText: string = 'Yes, delete it!',
    cancelText: string = 'Cancel'
  ) {
    return Swal.fire({
      title: title,
      text: message,
      showCancelButton: true,
      confirmButtonColor: '#009ea3',
      cancelButtonColor: '#1b1b1b',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    });
  }
  toast(message: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
          didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer); 
      toast.addEventListener('mouseleave', Swal.resumeTimer); 
    }
    });
  }
}
