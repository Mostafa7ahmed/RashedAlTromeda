import { Component, inject, signal } from '@angular/core';
import { HeaderPages } from "../../../components/header-pages/header-pages";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SerciceCategory } from '../../../Core/service/sercice-category';
import { IEngineer } from '../../../Core/Interface/iengineer';
import { Engineer } from '../../../Core/service/engineer';
import { IPaginationResponse } from '../../../Shared/Interface/iresonse';
import { DistanceFormatPipe } from '../../../Shared/pipes/distance-format-pipe';
import { ShortenPipe } from '../../../Shared/pipes/shorten-pipe';
import { environment } from '../../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-choose-engineer',
  imports: [HeaderPages , RouterModule , DistanceFormatPipe , ShortenPipe , TranslatePipe],
  templateUrl: './choose-engineer.html',
  styleUrl: './choose-engineer.scss'
})
export class ChooseEngineer {
 private _service = inject(Engineer);
  private _route = inject(ActivatedRoute);
 baseUrl :string =environment.baseUrl
  engineers = signal<IEngineer[]>([]);
  pageIndex = 1;
  pageSize = 10;

  ngOnInit() {
    const serviceId = Number(this._route.snapshot.paramMap.get('serviceId'));
    if (serviceId) 
      {
        this.loadEngineers(serviceId)
        localStorage.setItem('serviceId',serviceId.toString());
      };

  }

  loadEngineers(serviceId: number) {
    this._service.getEngineerList(this.pageIndex, this.pageSize, serviceId).subscribe({
      next: (res: IPaginationResponse<IEngineer>) => {
        this.engineers.set(res.result);
      },
      error: (err) => console.error('حدث خطأ أثناء تحميل المهندسين:', err)
    });
  }
}
