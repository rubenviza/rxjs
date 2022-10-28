import { from } from "rxjs";


//funcion de creacion from con array de strings
// se pasa array en vez de solo argumentos
from(['Alicia', 'Benito', 'Carlos']).subscribe({
    next: value => console.log(value),
   complete: () => console.log('Completed')
});  

//-------------------------------------------------


//funcion de creacion from con Promise
const somePromise = new Promise((resolve,reject) => {
    console.log('Start promise');
    //resolve('Resolved!');
    reject('Rejected!');
});

const observableFromPromise$ = from(somePromise);   // trabaja con Promise. then() y catch() se vinculan a next() y error() respectivamente

observableFromPromise$.subscribe({
   next: value => console.log(value),
   error: err => console.log('Error:',err),
   complete: () => console.log('Completed')
});