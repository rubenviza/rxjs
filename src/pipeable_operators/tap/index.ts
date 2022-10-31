import { filter, map, of, tap } from "rxjs";


of(1, 7, 3, 6, 2).pipe(
  filter(value => value > 5),     // filtra los mayores que 5
  tap(value => console.log('Spy:', value)),
  map(value => value * 2),        // los multiplica por 2   
).subscribe(value => console.log('Output:', value));


// tap puede tener el mismo codigo del Observer, con notificaciones error y complete. Ejemplo:
// tap({
//   next: (value) => {console.log('Spy:', value)}, 
//   error: (err) => { ... },
//   complete: () => { ... }
// }),