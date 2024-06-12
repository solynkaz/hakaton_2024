import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultViewComponent } from './default-view/default-view.component';
import { PageModule } from './page/page.module';
import { RouterModule } from '@angular/router';

export const BASE_MODULE_NAME = 'BASE_MODULE_NAME';

@NgModule({
  declarations: [DefaultViewComponent],
  imports: [CommonModule, PageModule.forRoot()],
  exports: [DefaultViewComponent],
})
export class BaseModule {}
