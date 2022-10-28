
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";

//Cold observable ----------------------------------------------
//en ejemplo las 3 conexiones en observers se hacen separadamente

// ajax() devuelve un Observable configurado
const ajax$ = ajax<any>('https://random-data-api.com/api/v2/users');

ajax$.subscribe(
    data => console.log('Cold sub 1:', data.response.first_name)
);

ajax$.subscribe(
    data => console.log('Cold sub 2:', data.response.first_name)
);

ajax$.subscribe(
    data => console.log('Cold sub 3:', data.response.first_name)
);

//---------------------------------------------------------------
//Hot observable ------------------------------------------------
//en ejemplo los observers reciben la informacion a la vez (multicasting)

const helloButton = document.querySelector('button#hello');

// observable esta vinculado a una fuente externa (evento click)
const helloClick$ = new Observable<MouseEvent>(subscriber => {
    helloButton.addEventListener('click', (event:MouseEvent) => {
        subscriber.next(event);
    })
    // add teardown logic to remove event listener
});

helloClick$.subscribe(event => console.log('Hot sub 1:', event.type, event.x, event.y));

setTimeout(() => {
    console.log('Subscripcion 2 starts');
    helloClick$.subscribe(event => console.log('Hot sub 2:', event.type, event.x, event.y));
},5000);