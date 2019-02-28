import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category.component';
import { CategoryItemsComponent } from './components/category-items.component';
import { CategoryItemDetailsComponent } from './components/category-item-details.component';



const ROUTES: Routes = [
    { path: "", component: CategoryComponent },
    { path: "home", component: CategoryComponent },
    { path: "cat/:cat/:id", component: CategoryItemsComponent },
    { path: "character/details/:url", component: CategoryItemDetailsComponent },
    { path: "**", redirectTo: "/", pathMatch: 'full' }
]

@NgModule({
    imports: [ RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'}) ],
    exports: [ RouterModule ]

})
export class AppRouteModule{ }