import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { Globals } from 'src/assets/globals';
import { LevelService } from 'src/app/services/level.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Level } from 'src/app/models/level';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-layout-subnav',
  templateUrl: './layout-subnav.component.html',
  styleUrls: ['./layout-subnav.component.scss'],
  styles: [':host {width: 100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSubnavComponent implements OnInit, OnDestroy {
  private levelSub: Subscription;
  private itemSub: Subscription;
  public mcpItem: Item;
  public humanItem: Item;
  private controlSub: Subscription;
  public topNav: string;
  public contentNav: string;
  public Globals = Globals;
  public curLevel: Level;

  constructor(
    public itemService: ItemService,
    public levelService: LevelService,
    public navigationService: NavigationService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(itm => itm.id === Globals.itemIds.mcp);
      this.humanItem = items.find(itm => itm.id === Globals.itemIds.human);
    });

    this.controlSub = this.navigationService.navigations$.subscribe((navigations) => {
      this.topNav = navigations.topNav;
      this.contentNav = navigations.contentNav;
    });

    this.levelSub = this.levelService.levels$.subscribe((levels) => {
      this.curLevel = levels.find(level => level.current);
    });
  }

  setNav(nav: string) {
    this.navigationService.contentNavigate(nav);
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
    this.levelSub.unsubscribe();
    this.controlSub.unsubscribe();
  }
}
