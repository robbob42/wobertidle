import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Globals } from '../../../assets/globals';
import { ItemService } from 'src/app/services/item.service';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { UtilsService } from 'src/app/services/utils.service';
import { Level } from 'src/app/models/level';
import { RebirthService } from 'src/app/services/rebirth.service';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-rebirth-card',
  templateUrl: './rebirth-card.component.html',
  styleUrls: ['./rebirth-card.component.scss']
})
export class RebirthCardComponent implements OnInit, OnDestroy {
  @Input() improvementType: string;
  @Input() header: string;

  public Globals = Globals;
  public itemsSub: Subscription;
  public rebirthsSub: Subscription;
  public mcpItem: Item;
  public demigodItem: Item;
  public nextRebirthItem: Level;
  public nextRebirthAmount: number;

  constructor(
    public itemService: ItemService,
    public utilsService: UtilsService,
    public rebirthService: RebirthService,
    private controlService: ControlService
    ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
      this.demigodItem = items.find(item => item.id === Globals.itemIds.demigod);
    });

    this.rebirthsSub = this.rebirthService.rebirths$.subscribe((rebirths) => {
      const rebirthItem = rebirths.find(rebirth => rebirth.current);
      this.nextRebirthItem = rebirths.find(rebirth => rebirth.id === rebirthItem.id + 1);
      this.nextRebirthAmount = this.utilsService.rebirthFib((rebirthItem.id * 2) + 1);
    });
  }

  rebirth() {
    this.rebirthService.rebirth();
    this.controlService.navigate('home');
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
    this.rebirthsSub.unsubscribe();
  }
}
