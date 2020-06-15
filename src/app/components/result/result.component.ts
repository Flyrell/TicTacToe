import { Player } from '@/model/player.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { winner: Player, draw: boolean },
    private dialogRef: MatDialogRef<ResultComponent>
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
}
