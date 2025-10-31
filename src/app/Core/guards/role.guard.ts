import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const _router = inject(Router);
    const _platform = inject(PLATFORM_ID);

    if (!isPlatformBrowser(_platform)) return false;

    const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('user_type');

    if (!token) {
      _router.navigate(['/auth/selectType']);
      return false;
    }

    if (!role || !allowedRoles.includes(role.toLowerCase())) {
      switch (role?.toLowerCase()) {
        case 'customer':
          _router.navigate(['/']);
          break;
        case 'engineer':
          _router.navigate(['/engineer']);
          break;
        case 'admin':
          _router.navigate(['/admin']);
          break;
        case 'center':
          _router.navigate(['/center']);
          break;
        default:
          _router.navigate(['/auth/selectType']);
      }
      return false;
    }

    // ✅ الدور مسموح له
    return true;
  };
};