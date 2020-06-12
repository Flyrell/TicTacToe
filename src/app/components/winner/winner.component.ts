import { Player } from '@/model/player.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public winner: Player, private dialogRef: MatDialogRef<WinnerComponent>) {}

  onClick(): void {
    this.dialogRef.close();
  }
}
