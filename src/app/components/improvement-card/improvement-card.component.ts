import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ImprovementService } from '../../services/improvement.service';
import initialItems from '../../../assets/items';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { Globals } from '../../../assets/globals';
import { ControlService } from '../../services/control.service';
import { Improvement } from 'src/app/models/improvement';

@Component({
  selector: 'app-improvement-card',
  templateUrl: './improvement-card.component.html',
  styleUrls: ['./improvement-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImprovementCardComponent implements OnInit, OnDestroy {
  @Input() improvementType: string[];
  @Input() improvee: string[];
  @Input() improveeId: number[];

  public initialItems = JSON.parse(JSON.stringify(initialItems));
  public itemsSub: Subscription;
  public mcpItem: Item;
  public autobuyRawItem: Item;
  public Globals = Globals;

  constructor(
    public improvementService: ImprovementService,
    public itemService: ItemService,
    public utilsService: UtilsService,
    private controlService: ControlService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
      this.autobuyRawItem = items.find(item => item.id === Globals.itemIds.autobuyRawUnlocked);
    });
  }

  buyImprovement(improvement: Improvement, errorFlash = true) {
    if (!improvement.levelMax || improvement.level < improvement.levelMax) {
      const insufficientItems = this.improvementService.buyImprovement(improvement.id);
      if (insufficientItems.length) {
        this.improvementService.buyImprovement(improvement.id).forEach(insufficientItemId => {
          if (errorFlash) {
            this.controlService.startRedPulse(`item-${insufficientItemId}amount`);
          }
        });
      } else {
        improvement.itemsCost.forEach(itemsCost => {
          this.controlService.startPulse(itemsCost.pulseId);
          this.controlService.startPulse(improvement.pulseId + 'level');
        });
      }
    }
  }

  toggleAutobuy(itemId: number) {
    this.improvementService.toggleAutobuy(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
