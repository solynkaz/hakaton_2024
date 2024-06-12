import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PageComponent],
  exports: [PageComponent],
})
export class PageModule {
  public static forRoot(): ModuleWithProviders<PageModule> {
    return {
      ngModule: PageModule,
      providers: [],
    };
  }

  public static forChild(): ModuleWithProviders<PageModule> {
    return {
      ngModule: PageModule,
      providers: [],
    };
  }
}
