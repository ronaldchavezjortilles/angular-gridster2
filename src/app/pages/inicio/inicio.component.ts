import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridsterPush,
  GridType
} from 'angular-gridster2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InicioComponent implements OnInit {
  options: GridsterConfig;
  dashboard: GridsterItem[];
  itemToPush!: GridsterItemComponent;

  public height: number = 0;


  constructor() {
    this.options = {
      gridType: GridType.VerticalFixed,
      compactType: CompactType.None,
      displayGrid: DisplayGrid.OnDragAndResize,
      pushItems: true,
      // disableScrollVertical: true, // Desactiva scroll interno
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      },
      maxCols: 7,
      minCols: 7,
      minRows: 10,
      maxRows: 300,
      disableScrollHorizontal: true, // Desactiva scroll horizontal si es necesario
      disableScrollVertical: true, // Desactiva scroll horizontal si es necesario
      itemChangeCallback: (item: GridsterItem) => this.onItemChange(item),
      itemResizeCallback: (item: GridsterItem) => this.onItemChange(item)
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0, initCallback: this.initItem.bind(this) },
      { cols: 2, rows: 2, y: 0, x: 2 },
      { cols: 1, rows: 1, y: 0, x: 4 },
      { cols: 3, rows: 2, y: 1, x: 4 },
      { cols: 1, rows: 1, y: 4, x: 5 },
      { cols: 1, rows: 1, y: 2, x: 1 },
      { cols: 2, rows: 2, y: 5, x: 5 },
      { cols: 2, rows: 2, y: 3, x: 2 },
      { cols: 2, rows: 1, y: 2, x: 2 },
      { cols: 1, rows: 1, y: 3, x: 4 },
      { cols: 1, rows: 1, y: 0, x: 6 }
    ];
  }


  ngOnInit(): void {
  }


  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    this.onItemChange(item);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  initItem(item: GridsterItem, itemComponent: any): void {
    this.itemToPush = itemComponent;
  }

  pushItem(): void {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) {
      // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(
        this.itemToPush.$item,
        this.itemToPush.item
      );
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  getItemComponent(): void {
    if (this.options.api && this.options.api.getItemComponent) {
      console.log('this.dashboard: ',this.dashboard)
      console.log(this.options.api.getItemComponent(this.dashboard[0]));
    }
  }

  onItemChange(item: GridsterItem): void {
    console.log('Cambio en el ítem:', item);
    console.log('Todos los valores:', this.dashboard);

    const bottomMostItem = this.getBottomMostItem()
    let altura = (bottomMostItem!.y + bottomMostItem!.cols + 3) * 250;
    if(altura<5){
      this.height = 4*250;
    } else {
      this.height = altura;
    }

    // this.height = 4 * 250

    // this.getBottomMostItem(); // Actualizamos el ítem más bajo cada vez que algo cambia
  }

    // Función para detectar el ítem más bajo
  getBottomMostItem(): GridsterItem | undefined {
    let bottomMostItem: GridsterItem | undefined;
    let maxBottom = -1; // Inicializamos con un valor bajo

    for (let item of this.dashboard) {
      // Calculamos la posición final en Y (bottom) del ítem
      const bottom = item.y + item.rows;

      // Si el ítem actual es más bajo, lo actualizamos
      if (bottom > maxBottom) {
        maxBottom = bottom;
        bottomMostItem = item;
      }
    }

    console.log('Ítem más bajo:', bottomMostItem);
    return bottomMostItem;
  }
}