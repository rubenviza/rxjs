import { debounceTime, fromEvent, map } from "rxjs";


const sliderInput = document.querySelector('input#slider');
 
fromEvent(sliderInput, 'input').pipe(
  debounceTime(2000),
  map(item => (item.target as HTMLInputElement).value)
).subscribe(value => console.log(value));