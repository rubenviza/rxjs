import { catchError, EMPTY, Observable, of } from "rxjs";


const failingHttpRequest$ = new Observable(subscriber => {
    setTimeout(() => {
        subscriber.error(new Error('Timeout'));
    }, 3000);
});

console.log('App Started!');

failingHttpRequest$.pipe(
    catchError(error => of('Fallback value (from first pipe)', error))     // devuelve observable que hace que observer original se suscriba. Cada valor emitido (con next) sera recibido por observer original 
).subscribe(
    value => console.log(value)
);

failingHttpRequest$.pipe(
    catchError(error => EMPTY)    // EMPTY es un rxjs build-in observable. Llama inmediatamente a notificacion complete
).subscribe({
    next: value => console.log(value),
    complete: () => console.log('Completed (from second pipe)')
});