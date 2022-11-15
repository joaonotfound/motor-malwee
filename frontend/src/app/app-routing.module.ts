import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersItemComponent } from './pages/order-item/order-item.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,
          children: [
            { path: 'groups', component: GroupsComponent },
            { path: "collections", component: CollectionsComponent },
            { path: "products", component: ProductsComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'customers', component: CustomersComponent },
            { path: "statistics", component: StatisticsComponent },
            { path: "orders", component: OrdersComponent },
            { path: "orders-items", component: OrdersItemComponent }
          ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
