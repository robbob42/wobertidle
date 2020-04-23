import { Component, OnInit, OnDestroy } from '@angular/core';
import { LevelService } from 'src/app/services/level.service';
import { Subscription } from 'rxjs';
import { Level } from 'src/app/models/level';

@Component({
  selector: 'app-powers-summary-card',
  templateUrl: './powers-summary-card.component.html',
  styleUrls: ['./powers-summary-card.component.scss']
})
export class PowersSummaryCardComponent implements OnInit, OnDestroy {
  public levelsSub: Subscription;
  public curLevelId: number;
  public levels: Level[];

  constructor(
    public levelService: LevelService
  ) { }

  ngOnInit(): void {
    this.levelsSub = this.levelService.levels$.subscribe((levels) => {
      this.curLevelId = levels.find(level => level.current).id;
      this.levels = levels;
    });
  }

  ngOnDestroy() {
    this.levelsSub.unsubscribe();
  }
}
