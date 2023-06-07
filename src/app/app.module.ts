import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './common/app-routing.module';
import { AppComponent } from './app.component';

import { ProjectCostComponent } from './cost-calutation/project-cost/project-cost.component';
import { HeaderComponent } from './layouts/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './common/meterial.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ProjectCostComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
