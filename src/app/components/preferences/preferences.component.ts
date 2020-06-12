import { AppState } from '@/app/store';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { getPlaygroundSize, getWinningTiles } from '@/app/store/selectors/game.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, withLatestFrom } from 'rxjs/operators';
import { setSize, setWinningTiles } from '@/app/store/actions/game.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    winningTiles: [3, [ Validators.required ]],
    playgroundSize: [3, [ Validators.required ]],
  });
  winningTiles$ = this.store.pipe(select(getWinningTiles));
  playgroundSize$ = this.store.pipe(select(getPlaygroundSize));

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PreferencesComponent>) {}

  ngOnInit(): void {
    this.playgroundSize$.pipe(
      withLatestFrom(this.winningTiles$),
      first(),
    ).subscribe(([ playgroundSize, winningTiles ]) => {
      this.form.setValue({ playgroundSize, winningTiles }, { emitEvent: false });
    });
  }

  onSubmit(): void {
    this.store.dispatch(setSize({ size: +this.form.get('playgroundSize').value }));
    this.store.dispatch(setWinningTiles({ winningTiles: +this.form.get('winningTiles').value }));
    this.dialogRef.close();
  }
}
