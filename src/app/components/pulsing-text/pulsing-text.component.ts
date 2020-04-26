import { Component, OnChanges, Input, OnInit, OnDestroy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ControlService } from 'src/app/services/control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pulsing-text',
  templateUrl: './pulsing-text.component.html',
  styleUrls: ['./pulsing-text.component.scss']
})
export class PulsingTextComponent implements OnInit, OnChanges, OnDestroy {
  @Input() text: string;
  @Input() pulseId: string;
  @Input() initialPulse = false;

  private controlSub: Subscription;
  public pulser: {
    pulseId: string,
    pulsing: boolean,
    initialPulse: boolean
  };

  constructor(
    public controlService: ControlService
  ) { }

  ngOnInit() {
    this.controlSub = this.controlService.controls$.subscribe((controls) => {
      this.pulser = controls.pulser.find(pls => pls.pulseId === this.pulseId);
    });
    this.controlService.addPulser({
      pulseId: this.pulseId,
      pulsing: this.initialPulse,
      initialPulse: this.initialPulse
    });
  }

  endPulse() {
    this.controlService.endPulse(this.pulseId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.pulseId && !changes.text.previousValue && changes.initialPulse && changes.initialPulse.currentValue) {
      this.controlService.startPulse(this.pulseId);
    }
    if (this.pulseId && changes.text.previousValue !== undefined && changes.text.previousValue !== changes.text.currentValue) {
      this.controlService.startPulse(this.pulseId);
    }
  }

  ngOnDestroy() {
    this.controlSub.unsubscribe();
  }
}
