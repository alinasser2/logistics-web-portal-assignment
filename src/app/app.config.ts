import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ApplicationConfig } from '@angular/core';

import { shipmentsReducer } from './features/shipments/store/shipments.reducer';
import { ShipmentsEffects } from './features/shipments/store/shipments.effects';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ shipments: shipmentsReducer }),
    provideEffects([ShipmentsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
    }),
  ],
};
