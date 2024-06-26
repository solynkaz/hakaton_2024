import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiLabelModule, TuiLoaderModule,
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

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
];
@NgModule({
  declarations: [MainPageComponent],
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
  ],
})
export class MainPageModule {}
