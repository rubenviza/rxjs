import { Observable, timer } from "rxjs";

console.log('App started');

//con funcion de creacion timer 
const subscription = timer(2000).subscribe({
    next: value => console.log(value),     // emite 0 cuando se cumple el tiempo
    complete: () => console.log('Completed! -- timer')
});

setTimeout(() => {
    subscription.unsubscribe();
    console.log('Unsubscribe -- timer');
}, 1000);         // para probar que unsubscribe funciona como debe ser
//-------------------------------------------------


//imitando el funcionamiento de fromEvent
const timer$ = new Observable<number>(subscriber => {
    const timeoutId = setTimeout(() =>{
        console.log('Timeout!');
        subscriber.next(0);
        subscriber.complete();
    }, 4000);

    return () => clearTimeout(timeoutId);
});

const subscription2 = timer$.subscribe({
    next: value => console.log(value),
    complete: () => console.log('Completed! -- imitation')
});

setTimeout(() => {
    subscription2.unsubscribe();
    console.log('Unsubscribe -- imitation');
}, 1000);          // para probar que unsubscribe funciona como debe ser
//-------------------------------------------------
