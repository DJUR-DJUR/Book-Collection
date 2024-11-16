import { lastValueFrom, timer} from 'rxjs';

export const wait = (due: number) => {
  return lastValueFrom(timer(due));
};

export const clearSelection = ()=> {
  const selection = document.getSelection();
  if(selection) {
    selection.removeAllRanges();
  }
}
