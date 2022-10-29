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
import { CreateGroupModalComponent } from './modals/create-group-modal/create-group-modal.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card';
import { EditGroupModalComponent } from './modals/edit-group-modal/edit-group-modal.component';
import { CreateSubgroupModalComponent } from './modals/create-subgroup-modal/create-subgroup-modal.component';
import { CollectionsComponent } from './collections/collections.component';
import { CreateCollectionModalComponent } from './modals/create-collection-modal/create-collection-modal.component';
import { EditCollectionModalComponent } from './modals/edit-collection-modal/edit-collection-modal.component';
import { ProductsComponent } from './pages/products/products.component'

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
    CreateGroupModalComponent,
    EditGroupModalComponent,
    CreateSubgroupModalComponent,
    CollectionsComponent,
    CreateCollectionModalComponent,
    EditCollectionModalComponent,
    ProductsComponent
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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
