import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatTableModule, MatInputModule, MatIconModule, MatFormFieldModule, MatListModule, MatCardModule, MatPaginatorModule } from '@angular/material';

const MODULES = [
    FlexLayoutModule, MatToolbarModule, MatButtonModule, MatTableModule, MatInputModule, MatIconModule, MatFormFieldModule,
    MatListModule, MatCardModule, MatPaginatorModule
    // NgxPaginationModule
]

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class MaterialModule { }