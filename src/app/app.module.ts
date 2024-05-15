import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ModulesModule } from './modules/modules.module';
import { AppState } from './app.state';
import { ProductReducer } from './core/state/products/products.reducer';
import { ProductEffects } from './core/state/products/products.effects';
import { CatalogReducer } from './core/state/category/category.reducer';
import { CategoryEffects } from './core/state/category/category.effects';
// import { UserReducer } from './core/state/users/users.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulesModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({
      products: ProductReducer,
      catalogs: CatalogReducer,
      // users: UserReducer,
    }),
    EffectsModule.forRoot([ProductEffects, CategoryEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
