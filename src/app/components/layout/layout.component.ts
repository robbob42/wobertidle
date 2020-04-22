import { Component, OnInit } from '@angular/core';
import { ClarityIcons } from '@clr/icons';
import { Message } from '../../models/message';
import { pulse } from './animations';
import { ActivityService } from '../../services/activity.service';
import { ItemService } from '../../services/item.service';
import { UtilsService } from '../../services/utils.service';
import { ImprovementService } from '../../services/improvement.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { Svg } from '../../../assets/svg';

import '@clr/icons';
import '@clr/icons/shapes/all-shapes';
import { ControlService } from '../../services/control.service';
import { LevelService } from '../../services/level.service';
import { RebirthService } from 'src/app/services/rebirth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    pulse
  ]
})
export class LayoutComponent implements OnInit {
  public navigation: string;
  public messages: Message[] = [];
  public messagesTop = '-3em';
  public messagesLeft = '24em';
  public alertTop = '9em';
  public alertLeft = '30em';
  public alertLeftBounce = '31em';
  public logVisible = true;
  public advanceStorylineVisible = true;
  public advanceDropdownOpen = false;
  public canSkip = true;
  public highlightArrow = false;
  public activities = [Globals.blankActivity];
  public inventory: Item[];
  public mcpItem = new Item(Globals.blankItem);
  public subNavPos = 'relative';
  public subNavTop = '';
  public sidenavTop = '';
  public Globals = Globals;

  constructor(
    // private messageService: MessageService,
    private activityService: ActivityService,
    private improvementService: ImprovementService,
    public itemService: ItemService,
    public utilsService: UtilsService,
    public controlService: ControlService,
    public levelService: LevelService,
    public rebirthService: RebirthService
  ) {
    // this.messageService.initializeMessages();
    // messageService.subscribeMessages().subscribe((subscribedMessages) => {
    //   this.messages = [];
    //   for (let i = 0; i < 4; i++) {
    //     if (typeof subscribedMessages[i] !== 'undefined') {
    //       this.messages.push(subscribedMessages[i]);
    //     }
    //   }
    //   const latestMessage = subscribedMessages[0];
    //   if (latestMessage.triggerId === 1000) {
    //     setTimeout(() => {
    //       const rect = document.getElementById('mcpDiv').getBoundingClientRect();
    //       this.alertTop = `${rect.top}px`;
    //       this.alertLeft = `${rect.left - 20}px`;
    //       this.alertLeftBounce = `${rect.left - 10}px`;
    //       this.highlightArrow = true;
    //     }, 10);
    //   }
    //   if (latestMessage.triggerId === 1001) {
    //     setTimeout(() => {
    //       const rect = document.getElementById('humanDiv').getBoundingClientRect();
    //       this.alertTop = `${rect.top}px`;
    //       this.alertLeft = `${rect.left - 20}px`;
    //       this.alertLeftBounce = `${rect.left - 10}px`;
    //       this.highlightArrow = true;
    //     }, 10);
    //   }
    //   if (latestMessage.triggerId === 1) {
    //     this.messagesTop = '14em';
    //   }
    // });
    // messageService.getMessages();

    // messageService.subscribeAdvance().subscribe((subscribedAdvanceVis) => {
    //   this.advanceStorylineVisible = subscribedAdvanceVis;
    // });
    // messageService.getAdvanceVisible();

  }

  ngOnInit(): void {
    this.improvementService.initialize();
    this.utilsService.initialize();
    this.levelService.initialize();
    this.rebirthService.initialize();

    this.customIcons();

    setTimeout(() => {
      this.activityService.initializeActivities();
      this.activityService.activities$.subscribe((activities) => {
        this.activities = activities;
      });
      this.itemService.initializeItems();
      this.itemService.items$.subscribe((items) => {
        this.inventory = items;
        this.mcpItem = items.find(invenItem => invenItem.id === 900);
      });
      this.controlService.controls$.subscribe((controls) => {
        this.navigation = controls.navigation;
      });
    });

    setTimeout(() => {
      this.skipIntro();
    }, 50);

    this.utilsService.navPosStylesSubnavSub().subscribe((coords) => {
      this.subNavPos = coords.position;
      this.subNavTop = `${coords.top}px`;
      this.sidenavTop = coords.top === 0 ? '0px' : `${coords.top + 35}px`;
    });
  }

  setNav(nav: string) {
    this.controlService.navigate(nav);
  }

  advanceStoryline() {
    // this.messageService.advanceStoryline();
  }

  showLog() {
    this.logVisible = true;
  }
  hideLog() {
    this.logVisible = false;
  }

  delayHideAlert() {
    setTimeout(() => {
      this.highlightArrow = false;
    }, 2000);
  }

  skipIntro() {
    this.advanceDropdownOpen = false;
    this.logVisible = false;
    if (this.canSkip) {
      this.canSkip = false;
      // this.messageService.processTrigger(1);
    }
  }

  customIcons() {
    ClarityIcons.add({
      waves: Svg.waves,
      shovel: Svg.shovel,
      clay: Svg.clay,
      grain: Svg.grain,
      rock: Svg.rock,
      bread: Svg.bread,
      gem: Svg.gem,
      demigod: Svg.demigod
    });
  }
}
