import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import initialItems from '../../../assets/items';
import { Item } from 'src/app/models/item';
import { SlotMachine } from 'src/app/models/slotMachine';
import { ImprovementService } from 'src/app/services/improvement.service';
import { Improvement } from 'src/app/models/improvement';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carnival-card',
  templateUrl: './carnival-card.component.html',
  styleUrls: ['./carnival-card.component.scss']
})
export class CarnivalCardComponent implements OnInit, OnDestroy {
  public slotMachine: SlotMachine = new SlotMachine(this.improvementService);
  public initialItems = initialItems;
  public gemItem: Item;
  public brickItem: Item;
  public cookedFish: Item;
  public boardItem: Item;
  public breadItem: Item;
  public winningMapping = this.slotMachine.getWinningMapping();
  public improvements: Improvement[];
  private itemSub: Subscription;
  private improvementSub: Subscription;
  private items: Item[];

  constructor(
    public itemService: ItemService,
    public improvementService: ImprovementService
  ) { }

  ngOnInit(): void {
    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.items = items;
      this.gemItem = new Item(initialItems.find(item => item.id === 4));
      this.brickItem = new Item(initialItems.find(item => item.id === 9));
      this.cookedFish = new Item(initialItems.find(item => item.id === 6));
      this.boardItem = new Item(initialItems.find(item => item.id === 5));
      this.breadItem = new Item(initialItems.find(item => item.id === 10));
    });

    this.improvementSub = this.improvementService.improvements$.subscribe((improvements) => {
      this.improvements = improvements;
    });
  }

  insertItems(rowNum: number, itemIds: number[]) {
    // this.slotMachine.activateRow(rowNum);
    let sufficientFunds = true;

    itemIds.forEach((itemId) => {
      if (!this.itemService.sufficientFunds(itemId, 1)) {
        sufficientFunds = false;
      }
    });

    if (sufficientFunds) {
      itemIds.forEach(itemId => {
        this.itemService.incrementItem(itemId, -1);
      });

      this.slotMachine.activateRow(rowNum);
    }
  }

  insertMax() {
    const row1Slots = this.slotMachine.getRowActives(0);
    const row1Inactives = 3 - row1Slots.filter(slot => slot.getActive()).length;
    for (let i = 0; i < row1Inactives; i++) {
      this.insertItems(0, [this.gemItem.id, this.brickItem.id]);
    }

    const row2Slots = this.slotMachine.getRowActives(1);
    const row2Inactives = 3 - row2Slots.filter(slot => slot.getActive()).length;
    for (let i = 0; i < row2Inactives; i++) {
      this.insertItems(1, [this.cookedFish.id, this.boardItem.id]);
    }

    const row3Slots = this.slotMachine.getRowActives(2);
    const row3Inactives = 3 - row3Slots.filter(slot => slot.getActive()).length;
    for (let i = 0; i < row3Inactives; i++) {
      this.insertItems(2, [this.breadItem.id]);
    }
  }

  pullHandle() {
    this.slotMachine.pullHandle();
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
    this.improvementSub.unsubscribe();
  }
}
