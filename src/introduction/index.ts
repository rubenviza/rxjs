import { name$, storeDataOnServer, storeDataOnServerError, someObservable$ } from './external';

//-------------------------------------

const observer = {
  next: (valor: string) => console.log(valor)
};
storeDataOnServer('Otro nombre').subscribe(observer);

storeDataOnServerError('Some value').subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error when saving:', err.message),
});

//-------------------------------------

name$.subscribe(value => console.log("Example:", value));   // "next:" es implicito

//-------------------------------------

const subscriptionObj = someObservable$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscriptionObj.unsubscribe();
}, 3000);

//-------------------------------------

console.log("subscription 1 starts")
someObservable$.subscribe(value => console.log(value));

setTimeout(() => {
  console.log("subscription 2 starts")
  someObservable$.subscribe(value => console.log(value));
},4000);