import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonToggleModule,
  ],
})
export class MaterialsModule {}
