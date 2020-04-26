import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { Subscription } from 'rxjs';
import { Level } from 'src/app/models/level';
import { ControlService } from 'src/app/services/control.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  private levelSub: Subscription;
  public curLevel: Level;
  private navSub: Subscription;
  public topNav: string;
  public contentNav: string;

  constructor(
    public levelService: LevelService,
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.levelSub = this.levelService.levels$.subscribe((levels) => {
      this.curLevel = levels.find(level => level.current);
    });

    this.navSub = this.navigationService.navigations$.subscribe((navigations) => {
      this.topNav = navigations.topNav;
      this.contentNav = navigations.contentNav;
    });
  }

  setTopNav(nav: string) {
    this.navigationService.topNavigate(nav);
  }

  ngOnDestroy() {
    this.levelSub.unsubscribe();
    this.navSub.unsubscribe();
  }
}
