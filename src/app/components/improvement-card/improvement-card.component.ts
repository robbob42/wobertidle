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

  public initialItems = initialItems;
  public itemsSub: Subscription;
  public mcpItem: Item;
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
    });
  }

  buyImprovement(improvement: Improvement) {
    if (!improvement.levelMax || improvement.level < improvement.levelMax) {
      this.improvementService.buyImprovement(improvement.id);
    }
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
