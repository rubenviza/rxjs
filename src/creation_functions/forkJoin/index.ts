
// Ej: Mike is from Lima and likes to eat pizza.

import { forkJoin, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

const randomName$ = ajax<any>('https://random-data-api.com/api/name/random_name');
const randomNation$ = ajax<any>('https://random-data-api.com/api/nation/random_nation');
const randomFood$ = ajax<any>('https://random-data-api.com/api/food/random_food');

// randomName$.subscribe(ajaxResponse => console.log(ajaxResponse.response.first_name));
// randomNation$.subscribe(ajaxResponse => console.log(ajaxResponse.response.capital));
// randomFood$.subscribe(ajaxResponse => console.log(ajaxResponse.response.dish));

forkJoin([randomName$, randomNation$, randomFood$]).subscribe(   // devuelve las 3 responses en orden
    ([nameAjax, nationAjax, foodAjax]) => console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`)  
);


//--------------------------------------------------------
//En forkJoin, si ocurre un error en cualquiera de los Observables que maneja. forkJoin hace unsubscribe() de todos ellos 

const a$ = new Observable(subscriber => {
    setTimeout(() =>{
        subscriber.next('A');
        subscriber.complete();
    }, 5000);

    return () => {
        console.log('A teardown');
    }
});

const b$ = new Observable(subscriber => {
    setTimeout(() =>{
        subscriber.error('Failure');
    }, 3000);

    return () => {
        console.log('B teardown');
    }
});

forkJoin([a$, b$]).subscribe({    
    next: value => console.log(value),
    error: err => console.log('Error:', err)
});