import {
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Item } from 'muuri';
import { MuuriGridDirective } from './muuri-grid.directive';

@Directive({
    selector: '[muuriGridItem]',
})
export class MuuriGridItemDirective implements OnInit, OnDestroy {
    @Output() itemCreated: EventEmitter<Item> = new EventEmitter();

    constructor(
        @Host() private _tileGrid: MuuriGridDirective,
        private _elRef: ElementRef
    ) {}

    ngOnInit(): void {
        // as Angular creates one item at a time, we'll get an array back with just one item
        this.itemCreated.emit(this._tileGrid.addItem(this._elRef)[0]);

        // force refresh the grid to prevent overlapping items
        this._tileGrid.refresh();
    }

    ngOnDestroy(): void {
        this._tileGrid.removeItem(this._elRef);
    }
}
