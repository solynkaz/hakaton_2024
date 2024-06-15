import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesComponent } from './vacancies.component';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiLabelModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiInputSliderModule,
  TuiInputTimeModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiStepperModule,
} from '@taiga-ui/kit';
import {
  TuiCurrencyPipeModule,
  TuiMoneyModule,
} from '@taiga-ui/addon-commerce';
import { VacancyComponent } from './components/vacancy.component';

const routes: Routes = [
  {
    path: '',
    component: VacanciesComponent,
  },
];
@NgModule({
  declarations: [VacanciesComponent, VacancyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TuiButtonModule,
    ReactiveFormsModule,
    TuiStepperModule,
    TuiErrorModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    TuiInputPasswordModule,
    TuiInputSliderModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiInputPhoneModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    TuiInputTimeModule,
    TuiCheckboxLabeledModule,
    TuiLabelModule,
    TuiHintModule,
    TuiMoneyModule,
    TuiFieldErrorPipeModule,
    TuiCurrencyPipeModule,
    TuiLoaderModule,
    TuiScrollbarModule,
  ],
})
export class VacanciesModule {}
