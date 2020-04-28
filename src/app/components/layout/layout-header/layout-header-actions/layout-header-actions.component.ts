import { Component, OnInit, OnDestroy } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ControlService } from 'src/app/services/control.service';
import { Subscription } from 'rxjs';
import { Level } from 'src/app/models/level';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import { Globals } from 'src/assets/globals';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-layout-header-actions',
  templateUrl: './layout-header-actions.component.html',
  styleUrls: ['./layout-header-actions.component.scss']
})
export class LayoutHeaderActionsComponent implements OnInit, OnDestroy {
  private levelSub: Subscription;
  public curLevel: Level;
  private navSub: Subscription;
  public topNav: string;
  public contentNav: string;
  private itemSub: Subscription;
  private mcpItem: Item;
  private levelInterval: any;

  constructor(
    public levelService: LevelService,
    public navigationService: NavigationService,
    public controlService: ControlService,
    private itemService: ItemService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.levelSub = this.levelService.levels$.subscribe((levels) => {
      this.curLevel = levels.find(level => level.current);
    });

    this.navSub = this.navigationService.navigations$.subscribe((navigations) => {
      this.topNav = navigations.topNav;
      this.contentNav = navigations.contentNav;
    });

    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(itm => itm.id === Globals.itemIds.mcp);

      if (this.mcpItem && this.curLevel && this.mcpItem.amount >= this.utilsService.levelFib(this.curLevel.id)) {
        this.levelInterval = setInterval(() => {
          this.controlService.startPulse('levelup');
        }, 2000);
      } else {
        clearInterval(this.levelInterval);
      }
    });

  }

  setContentNav(nav: string) {
    this.navigationService.contentNavigate(nav);
  }

  ngOnDestroy() {
    this.levelSub.unsubscribe();
    this.navSub.unsubscribe();
    this.itemSub.unsubscribe();

    clearInterval(this.levelInterval);
  }
}
