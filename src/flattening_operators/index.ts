import { catchError, concatMap, EMPTY, fromEvent, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

// First part ----------------------------------------

const source$ = new Observable(subscriber => {
    setTimeout(() => subscriber.next('A'), 2000);
    setTimeout(() => subscriber.next('B'), 5000);
});

console.log('App #1 has started');
source$.pipe(
    concatMap(value => of(1, 2))      // cuando se emite el valor, concatMap suscribe otro observable 
).subscribe(value => console.log(value));    // recibe emisiones del flattening operator (concatMap)

//----------------------------------------------------


// Second part ( works inputting "name", "food") ---------

const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

fromEvent(fetchButton, 'click').pipe(
    map(() => endpointInput.value), 
    switchMap(      // si hay un error dentro de un flattening operator, se replica al observer exterior (a diferencia de notificacion complete)
        value => ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
            // aquí notificacion complete no se replica a observer exterior
            // catchError(() => EMPTY)
            catchError(error => of(`Could not fetch data: ${error}`))     
        )   
    )
//    ,catchError(() => EMPTY)          // emitiría notificacion complete a observer exterior, observable exterior finalizaría
).subscribe({
    next: value => console.log(value),
    error: err => console.log('Error:',err),
    complete: () => console.log('Completed')
});

// La diferencia entre los flattening operators es el cómo administran la concurrencia (probar cambiando en el codigo)
// concatMap: los request se apilan en orden y se procesan uno a la vez esperando a que cada uno termine.
// switchMap: cuando entra un request cancela (unsubscribe) el request anterior y suscribe el nuevo al inner observable. NO usar cuando se quiere grabar en BD.
// mergeMap: los request se procesan de inmediato suscribiendo n inner observables en paralelo. Puede ocasionar fugas en la memoria.