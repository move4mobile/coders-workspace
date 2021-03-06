import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BadgeTier } from '@gamify/shared';
import { BadgeDialogData } from '../../../core/interfaces/badge-dialog-data.interface';

@Component({
  selector: 'coders-badge-modal',
  templateUrl: './badge-modal.component.html',
  styleUrls: ['./badge-modal.component.scss']
})
export class BadgeModalComponent implements OnInit {

  tiers: { key: BadgeTier, value: string }[] = [
    { key: BadgeTier.BRONZE, value: 'Bronze' },
    { key: BadgeTier.SILVER, value: 'Silver' },
    { key: BadgeTier.GOLD, value: 'Gold' },
    { key: BadgeTier.PLATINUM, value: 'Platinum' },
  ];

  errorMessage: string|string[]|undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<BadgeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BadgeDialogData,
  ) {
    
  }
  ngOnInit(): void {
    if (this.data.error) {
      this.errorMessage = this.data.error;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
