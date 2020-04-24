import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-accordion-stats',
  templateUrl: './accordion-stats.component.html',
  styleUrls: ['./accordion-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionStatsComponent implements OnInit, OnDestroy {
  public itemsSub: Subscription;
  public mcpItem: Item;
  public humanItem: Item;
  public Globals = Globals;

  constructor(
    public itemService: ItemService,
    public utilsService: UtilsService,
    public levelService: LevelService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
      this.humanItem = items.find(item => item.id === Globals.itemIds.human);
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
