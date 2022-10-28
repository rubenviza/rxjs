import { Observable, of } from "rxjs";

//--------------------------------

export function storeDataOnServer(data: string): Observable<string> {
    return new Observable(subscriber => {
      setTimeout(() => { 
        subscriber.next(`Saved successfully: ${data}`);
        subscriber.complete();
      }, 5000);
    });
  }
  
  export function storeDataOnServerError(data: string): Observable<string> {
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.error(new Error('Failure!'));
      }, 6000);
    });
  }

//--------------------------------

export const name$ = of('Xian', 'Young', 'Zen');  // "of" convierte a observable, luego coloca cada elemento en "next() al final llama a complete()"

//--------------------------------

export const someObservable$ = new Observable<string>(subscriber => {
    console.log('Observable someObservable$ executed');
    subscriber.next('Alice');
    setTimeout(() => subscriber.next('Ben'), 2000);
    setTimeout(() => subscriber.next('Charlie'), 4000);
  });  

//--------------------------------
