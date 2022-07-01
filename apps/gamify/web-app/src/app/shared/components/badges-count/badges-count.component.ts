import { Component, Input } from '@angular/core';
import { BadgesCountInput } from '../../../core/interfaces';

@Component({
  selector: 'coders-badges-count',
  templateUrl: './badges-count.component.html',
  styleUrls: ['./badges-count.component.scss']
})
export class BadgesCountComponent {

  @Input()
  large: boolean;

  @Input()
  bronze: BadgesCountInput = { count: 0, tooltip: 'Bronze' };

  @Input()
  silver: BadgesCountInput = { count: 0, tooltip: 'Silver' };

  @Input()
  gold: BadgesCountInput = { count: 0, tooltip: 'Gold' };

  @Input()
  platinum: BadgesCountInput = { count: 0, tooltip: 'Platinum' };

}
