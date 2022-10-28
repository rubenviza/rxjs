import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber =>{
    console.log('Observable executing');
    subscriber.next('Alice');
    subscriber.next('Ben');
    setTimeout(() => {
        subscriber.next('Charlie');        
      //  subscriber.complete();
    }, 2000);
    setTimeout(() => subscriber.error(new Error('Failure')), 4000);

    return () => {
        console.log('Teardown');       // Teardown logic. Cleanup or cancellation logic
    };
});

console.log('before subscribe');

observable$.subscribe({
    next: valor => console.log(valor),
    error: err => console.log(err.message),
    complete: () => console.log('Completed')
});

