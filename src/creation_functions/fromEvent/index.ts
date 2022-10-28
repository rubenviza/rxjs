import { fromEvent, Observable } from "rxjs";

const triggerButton = document.querySelector('button#trigger');

//con funcion de creacion fromEvent 
const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
    event => console.log("with fromEvent:", event.type, event.x, event.y)
);

setTimeout(() => {
    console.log('Unsubscribe with fromEvent');
    subscription.unsubscribe();
},5000);

//-------------------------------------------------


//imitando el funcionamiento de fromEvent
const triggerClick$ = new Observable<MouseEvent>(subscriber => {
    const clickHandlerFn = (event:MouseEvent) => {
        console.log('Event callback executed');
        subscriber.next(event);    
    }
    triggerButton.addEventListener('click', clickHandlerFn);
    return () => {
        triggerButton.removeEventListener('click', clickHandlerFn);
    };
});

const subs2 = triggerClick$.subscribe(
    event => console.log("imitation: ",event.type, event.x, event.y)
);

setTimeout(() => {
    console.log('Unsubscribe imitation');
    subs2.unsubscribe();
},5000);

//-------------------------------------------------