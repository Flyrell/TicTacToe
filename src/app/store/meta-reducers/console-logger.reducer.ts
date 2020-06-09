import { ActionReducer } from '@ngrx/store';

export function consoleLogger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log(action.type);
    return reducer(state, action);
  };
}
