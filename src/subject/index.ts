import { fromEvent, map, Subject } from "rxjs";

const emitButton = document.querySelector('button#emit');
const inputElement: HTMLInputElement = document.querySelector('#value-input');
const subscribeButton = document.querySelector('button#subscribe');

const value$ = new Subject<string>();

// fromEvent(emitButton, 'click').subscribe(
//     () => value$.next(inputElement.value)
// );

// Misma funcionalidad que código anterior  
// Subject se puede comportar como observer, transmitiendo DE ESTA FORMA!. También transmitiría error or complete de ser el caso.
fromEvent(emitButton, 'click').pipe(
    map(() => inputElement.value)
).subscribe(value$);       


fromEvent(subscribeButton, 'click').subscribe(
    () => {
        console.log('New Subscription');
        value$.subscribe(value => console.log(value));
    }
);