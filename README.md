# ngx-muuri

Angular wrapper around the [Muuri JavaScript library](https://github.com/haltu/muuri). **Only supported on Angular 9 and newer versions.**

## Basic Usage

Add `MuuriModule` as an import to your `app.module.ts`:

```TypeScript
import { MuuriModule } from 'ngx-muuri';

@NgModule({
  declarations: [...],
  imports: [
    ...
    MuuriModule
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```

`app.component.html`

```HTML
<button id="add-item-button" (click)="addToGrid()">+ Add new block</button>
<br><br>
<div #grid class="grid" muuriGrid [config]="layoutConfig">
    <div class="grid-item" muuriGridItem *ngFor="let item of blockItems">
        <div class="grid-item-content">
            {{ item }}
        </div>
    </div>
</div>
```

`app.component.ts`

```TypeScript
import { Component } from '@angular/core';
import { GridOptions } from 'muuri';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    blockItems: string[] = ['test', 'test2'];

    // Add any options you'd like to set here
    public layoutConfig: GridOptions = {
        items: [],
        layoutOnInit: false,
        dragEnabled: true,
        layout: {
            fillGaps: true,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: true
        }
    };

    addToGrid() {
        this.blockItems.push('hello');
    }
}
```

## Advanced usage

### Events

Muuri exposes many [events](https://github.com/haltu/muuri#grid-events) that you can subscribe to. You can get the `Grid` object as follows:

`app.component.html`

```HTML
<div muuriGrid (gridCreated)="onGridCreated($event)"></div>
```

`app.component.ts`

```TypeScript
import Grid from 'muuri';

onGridCreated(grid: Grid) {
  /**
   * Now you can do everything you want with the Grid object,
   * like subcribing to Muuri's events
   */
  grid.on('add', function (items) {
    console.log(items);
  });
}
```

You can also get a grid item when it is created:

`app.component.html`

```HTML
<div muuriGridItem (itemCreated)="onItemCreated($event)"></div>
```

`app.component.ts`

```TypeScript
import Item from 'muuri';

onItemCreated(item: Item) {
  // Now you can do anything you want with the grid item
}
```
