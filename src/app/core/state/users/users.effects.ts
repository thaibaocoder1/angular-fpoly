// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import * as CatalogActions from './users.actions';
// import { CategoryService } from '../../services/category/category.service';

// @Injectable()
// export class UserEffects {
//   loadCatalog$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CatalogActions.loadCatalog),
//       mergeMap(() =>
//         this.catalogService.getAll().pipe(
//           map((catalogs) => CatalogActions.loadCatalogSuccess({ catalogs })),
//           catchError((error) =>
//             of(CatalogActions.loadCatalogFailure({ error }))
//           )
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private catalogService: CategoryService
//   ) {}
// }
