import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import Grid, { GridOptions, Item } from "muuri";

@Directive({
  selector: "[muuriGrid]",
})
export class MuuriGridDirective implements OnInit, OnDestroy, OnChanges {
  @Input() config: GridOptions;
  @Output() gridCreated: EventEmitter<Grid> = new EventEmitter();
  gridObject?: Grid;

  constructor(private _elRef: ElementRef) {}

  ngOnInit(): void {
    this.init(this._elRef);
  }

  /**Rebuild the grid when the Muuri config changes*/
  ngOnChanges(): void {
    if (this.gridObject) {
      this.destroyLayout();
      this.init(this._elRef);
    }
  }

  /**Initialize the grid*/
  init(grid: ElementRef): void {
    this.gridObject = new Grid(grid.nativeElement, this.config);
    this.gridCreated.emit(this.gridObject);
  }

  /**Add a new item to the grid*/
  addItem(item: ElementRef): Item[] {
    return this.gridObject.add(item.nativeElement);
  }

  destroyLayout(): void {
    this.gridObject.destroy();
    this.gridObject = null;
  }

  refresh(): void {
    this.gridObject.refreshItems();
  }

  ngOnDestroy(): void {
    this.destroyLayout();
  }

  /**Remove an item from the grid*/
  removeItem(item: ElementRef): void {
    const gridItem = this.gridObject.getItem(item.nativeElement);
    this.gridObject.remove([gridItem], {
      layout: true,
    });
  }
}
