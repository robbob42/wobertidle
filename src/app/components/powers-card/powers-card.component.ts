import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import initialItems from '../../../assets/items';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { Globals } from '../../../assets/globals';
import { LevelService } from '../../services/level.service';
import { Level } from '../../models/level';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-powers-card',
  templateUrl: './powers-card.component.html',
  styleUrls: ['./powers-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowersCardComponent implements OnInit, OnDestroy {
  @Input() improvementType: string;
  @Input() header: string;

  public initialItems = initialItems;
  public itemsSub: Subscription;
  public levelsSub: Subscription;
  public mcpItem: Item;
  public demigodItem: Item;
  public nextLevelItem: Level;
  public Globals = Globals;
  public nextLevelAmount: number;

  constructor(
    public levelService: LevelService,
    public itemService: ItemService,
    public utilsService: UtilsService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
      this.demigodItem = items.find(item => item.id === Globals.itemIds.demigod);
    });

    this.levelsSub = this.levelService.levels$.subscribe((levels) => {
      const levelItem = levels.find(level => level.current);
      this.nextLevelItem = levels.find(level => level.id === levelItem.id + 1);
      this.nextLevelAmount = this.utilsService.levelFib(levelItem.id + 1);
    });
  }

  levelUp() {
    this.levelService.levelUp();
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.levelsSub.unsubscribe();
  }
}
