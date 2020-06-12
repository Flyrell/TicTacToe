import { Store } from '@ngrx/store';
import { AppState } from '@/app/store';
import { Player } from '@/model/player.model';
import { Component, Inject } from '@angular/core';
import { newGame } from '@/app/store/actions/game.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent {

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public winner: Player,
    private dialogRef: MatDialogRef<WinnerComponent>,
  ) {}

  onClick(): void {
    this.store.dispatch(newGame());
    this.dialogRef.close();
  }
}
