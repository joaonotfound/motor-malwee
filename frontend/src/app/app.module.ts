import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from './components/logo/logo.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar';
import { GroupsComponent } from './pages/groups/groups.component';
import { TableComponent } from './components/table/table.component'
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card';
import { GroupModalComponent } from './modals/group-modal/group-modal.component';
import { CreateSubgroupModalComponent } from './modals/create-subgroup-modal/create-subgroup-modal.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { CreateCollectionModalComponent } from './modals/create-collection-modal/create-collection-modal.component';
import { EditCollectionModalComponent } from './modals/edit-collection-modal/edit-collection-modal.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateProductModalComponent } from './modals/create-product-modal/create-product-modal.component'
import { MatSelectModule } from '@angular/material/select';
import { CustomersComponent } from './pages/customers/customers.component';
import { CreateCustomerModalComponent } from './modals/create-customer-modal/create-customer-modal.component';
import { TableDeleteModalComponent } from './modals/table-delete-modal.ts/table-delete-modal.ts.component';
import { CenterComponent } from './center/center.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ButtonComponent } from './components/button/button.component';
import { CounterComponent } from './components/counter/counter.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { AddressModalComponent } from './modals/address-modal/address-modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { OrderModalComponent } from './modals/order-modal/order-modal.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersItemComponent } from './pages/order-item/order-item.component';
import { OrderItemModalComponent } from './modals/order-item-modal/order-item-modal.component';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    GroupsComponent,
    TableComponent,
    GroupModalComponent,
    CreateSubgroupModalComponent,
    CollectionsComponent,
    CreateCollectionModalComponent,
    EditCollectionModalComponent,
    ProductsComponent,
    CreateProductModalComponent,
    CustomersComponent,
    CreateCustomerModalComponent,
    TableDeleteModalComponent,
    CenterComponent,
    StatisticsComponent,
    ButtonComponent,
    CounterComponent,
    CustomerComponent,
    AddressModalComponent,
    OrderModalComponent,
    OrdersComponent,
    OrdersItemComponent,
    OrderItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
