import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {
  @Input() itemId: string;

  constructor( ) {
  }

  ngOnInit() {
  }

}
