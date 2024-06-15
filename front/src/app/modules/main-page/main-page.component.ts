import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthProfileService } from '../../services/auth-profile.service';
import { Router } from '@angular/router';

const BACKEND = environment.api.backend;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _httpClient: HttpClient,
    private readonly _authService: AuthProfileService,
    private readonly _router: Router,
    @Inject(TuiAlertService) protected readonly alert: TuiAlertService
  ) {}

  authorizing = false;
  registration = false;
  isLoading = false;

  formGroup!: FormGroup;

  toggleRegistration() {
    this.registration = true;
    this.authorizing = false;

    this.formGroup = new FormGroup({
      first_name: new FormControl('', Validators.required),
      middle_name: new FormControl('', Validators.required),
      last_name: new FormControl(''),
      mail: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      pass_repeat: new FormControl('', Validators.required),
    });
  }

  toggleAuthorization() {
    this.registration = false;
    this.authorizing = true;

    this.formGroup = new FormGroup({
      mail: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  submitUser() {
    if (this.registration) {
      this.registerUser();
    } else {
      this.authorizeUser();
    }
  }

  authorizeUser(): void {
    const { mail, pass } = this.formGroup.getRawValue();
    const user = { email: mail, password: pass };

    this.isLoading = true;

    this._httpClient
      .post<{ token: string }>(`${BACKEND}/token/`, user)
      .subscribe({
        next: ({ token }) => {
          this.triggerSuccessPush('Вы успешно авторизовались');
          this._authService.saveTokens(token);
          this.isLoading = false;
          this._router.navigate(['vacancies']);
        },
        error: (error) => {
          this.triggerFailPush(
            'Произошла ошибка авторизации, проверьте данные и попробуйте снова'
          );
          this.isLoading = false;
          this._cdr.markForCheck();
        },
      });
  }

  registerUser(): void {
    const user: any = {
      email: this.formGroup.get('mail')?.getRawValue(),
      password: this.formGroup.get('pass')?.getRawValue(),
      first_name: this.formGroup.get('first_name')?.getRawValue(),
      last_name: this.formGroup.get('last_name')?.getRawValue(),
      patronymic: this.formGroup.get('middle_name')?.getRawValue(),
    };

    if (user.password !== this.formGroup.get('pass_repeat')?.getRawValue()) {
      this.triggerFailPush('Пароли не совпадают, проверьте введенные значения');
      return;
    }

    this._httpClient.post(`${BACKEND}/register/applicant/`, user).subscribe({
      next: (value) => {
        this.triggerSuccessPush('Успешная регистрация');
        this.toggleAuthorization();
      },
      error: (error) => {
        if (error.error?.email?.[0]) {
          this.triggerFailPush('Не валидный e-mail');
        } else {
          this.triggerFailPush(
            'Неудачная попытка регистрации, проверьте данные'
          );
        }
      },
    });
  }

  triggerSuccessPush(text: string) {
    this.alert
      .open(text, {
        status: 'success',
        autoClose: true,
        hasCloseButton: false,
      })
      .subscribe();
  }

  triggerFailPush(text: string) {
    this.alert
      .open(text, {
        status: 'error',
        autoClose: true,
        hasCloseButton: false,
      })
      .subscribe();
  }
}
