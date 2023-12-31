import { NgModule } from '@angular/core';
import { MuuriGridDirective } from './muuri-grid.directive';
import { MuuriGridItemDirective } from './muuri-grid-item.directive';

@NgModule({
    declarations: [MuuriGridDirective, MuuriGridItemDirective],
    exports: [MuuriGridDirective, MuuriGridItemDirective],
})
export class MuuriModule {}
