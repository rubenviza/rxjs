import { BehaviorSubject, fromEvent, Subject, withLatestFrom } from "rxjs";

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');


// igual que Subject pero tiene siempre un valor inicial y emite al observer la ultima notificacion emitida apenas se suscribe 

const isLoggedIn$ = new BehaviorSubject<boolean>(false);    

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// Navigation bar
isLoggedIn$.subscribe(
    loginState => loggedInSpan.innerText = loginState.toString()
);

// Buttons
isLoggedIn$.subscribe(loginState => {
    logoutButton.style.display = loginState? 'block':'none';    
    loginButton.style.display = loginState? 'none':'block';
});

//--------------

fromEvent(printStateButton,'click').subscribe(
    () => console.log('User is logged in:', isLoggedIn$.value)
);

// Otra forma
fromEvent(printStateButton,'click').pipe(
    withLatestFrom(isLoggedIn$)     // emite array con: último evento y última emisión del observable (que está como argumento)
    ).subscribe( 
        ([event, loginState]) => console.log('User is logged in:', loginState)
);