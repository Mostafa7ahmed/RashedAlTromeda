import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProfileOrganizationService } from '../../../Core/service/Organization/profileOrganization';
import { IOrganizationResponse } from '../../../Core/Interface/iorganization';
import { OrganizationEngineer } from '../../../Core/service/engineer/organization';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-centers',
  imports: [RouterModule],
  templateUrl: './centers.html',
  styleUrl: './centers.scss'
})
export class Centers {
 private _orgService = inject(OrganizationEngineer);
  organization = signal<IOrganizationResponse | null>(null);
  private _route = inject(ActivatedRoute);
  centerId = signal<number | null>(null);
  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    const serviceId = Number(this._route.snapshot.paramMap.get('id'));
if (serviceId) {
      this.centerId.set(serviceId);
      console.log('Center ID:', serviceId);
          this.loadOrganization(serviceId);

    }
  }

  loadOrganization(id: number) {
    this._orgService.getOneOrganization(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.organization.set(res.result);
        }
      },
      error: (err) => console.error(err)
    });
  }
}
