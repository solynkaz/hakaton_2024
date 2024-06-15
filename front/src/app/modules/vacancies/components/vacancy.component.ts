import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthProfileService } from '../../../services/auth-profile.service';
import { environment } from '../../../../environments/environment';
import { IVacancy } from '../schema/schema';
import { tuiIconHeartFilledLarge, tuiIconHeartLarge } from '@taiga-ui/icons';

const BACKEND = environment.api.backend;

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent implements OnInit {
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthProfileService,
    @Inject(TuiAlertService) protected readonly alert: TuiAlertService
  ) {}

  @Input() vacancy!: IVacancy;
  isLiked: boolean = false;

  ngOnInit() {}

  likeThisVacancy() {
    this.isLiked = !this.isLiked;
  }

  protected readonly tuiIconHeartLarge = tuiIconHeartLarge;
  protected readonly tuiIconHeartFilledLarge = tuiIconHeartFilledLarge;
}
