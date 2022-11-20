import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { CustomerResolver } from './guards/customer.resolver';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrdersItemComponent } from './pages/order-item/order-item.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
          children: [
            { path: 'groups', component: GroupsComponent },
            { path: "collections", component: CollectionsComponent },
            { path: "products", component: ProductsComponent },
            { path: 'customer', component: CustomerComponent, resolve: { customer: CustomerResolver }},
            { path: 'customers', component: CustomersComponent },
            { path: "statistics", component: StatisticsComponent },
            { path: "orders", component: OrdersComponent },
            { path: "orders-items", component: OrdersItemComponent }
          ]
  },
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
