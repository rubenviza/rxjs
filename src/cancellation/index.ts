import { Observable } from "rxjs";

const interval$ = new Observable<number>( subscriber => {
    let i = 0;
    const intervalId = setInterval(() => {
        console.log('Emitted', i);
        subscriber.next(i++);
    }, 1000);
    return () => {
        clearInterval(intervalId);   // si no paramos/limpiamos a la funcion setInterval, seguirá emitiendo valores
    }
});

const subscription = interval$.subscribe(
    val => (val > 7 ? callUnsubscribe() : console.log('1era suscripcion: ', val))
);

function callUnsubscribe() {
    console.log('Unsubscribe 1era');
    subscription.unsubscribe();
}

const subscrip2 = interval$.subscribe(val => console.log('2da suscripcion: ', val));
setTimeout(() => {
    console.log('Unsubscribe 2da');
    subscrip2.unsubscribe();
}, 3000);

