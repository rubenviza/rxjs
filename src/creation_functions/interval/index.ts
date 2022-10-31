import { interval, Observable } from "rxjs";

console.log('App started');

//con funcion de creacion interval.  Nunca termina. Nunca envía notificacion complete
const subscription = interval(1000).subscribe({
    next: value => console.log('interval():',value),     // empieza desde 0 
});

setTimeout(() => {
    subscription.unsubscribe();
    console.log('Unsubscribe -- interval');
}, 5000);         
//-------------------------------------------------


//imitando el funcionamiento de interval. Nunca termina. Nunca envía notificacion complete
const interval$ = new Observable<number>(subscriber => {
    let counter = 0;
    const intervalId = setInterval(() =>{
        console.log('Imitation interval!');
        subscriber.next(counter++);
    }, 1000);

    return () => clearInterval(intervalId);
});

const subscription2 = interval$.subscribe({
    next: value => console.log('imitation:',value),
});

setTimeout(() => {
    subscription2.unsubscribe();
    console.log('Unsubscribe -- imitation');
}, 9000);        
//-------------------------------------------------
