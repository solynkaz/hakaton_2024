import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthProfileService } from '../../services/auth-profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tuiIconSearchLarge } from '@taiga-ui/icons';
import { IVacancy } from './schema/schema';
import { take } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND = environment.api.backend;

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesComponent implements OnInit {
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthProfileService,
    private readonly _router: Router,
    @Inject(TuiAlertService) protected readonly alert: TuiAlertService
  ) {}

  menu = ['Новости', 'Сообщения', 'Вакансии', 'Профиль'];
  menuSection = this.menu[2];
  isLoading = false;

  vacancies: IVacancy[] = [];

  formGroup = new FormGroup({
    searchControl: new FormControl(''),
  });

  toggleMenuSection(section: string) {
    // this.menuSection = section;
  }

  exitProfile() {
    this._authService.clearTokens();
    this._router.navigate(['/main-page']);
  }

  subMenu = [
    'Все',
    'Разработка',
    'Аналитика',
    'Архитектура',
    'Тестирование',
    'Data-практика',
    'Менеджмент',
    'Другое',
    'Избранное',
  ];
  subMenuSection = this.subMenu[0];

  toggleSubMenuSection(section: string) {
    this.subMenuSection = section;
  }

  protected readonly tuiIconSearchLarge = tuiIconSearchLarge;

  ngOnInit() {
    this.isLoading = true;
    this._httpClient
      .get<IVacancy[]>(`${BACKEND}/vacancies/`)
      .subscribe((value: IVacancy[]) => {
        this.vacancies = value;
        this.isLoading = false;
        this._cdr.markForCheck();
      });
  }
}
