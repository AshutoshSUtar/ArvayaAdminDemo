import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersComponent } from './Masters/masters.component';

import { PincodesComponent } from './components/PincodeMaster/pincodes/pincodes.component';
import { LanguageMasterTableComponent } from './components/Language Master/language-master-table/language-master-table.component';

import { ListstateComponent } from './components/State/liststate/liststate.component';
import { ListcityComponent } from './components/City/listcity/listcity.component';
import { CountryMasterComponent } from './components/Country Master/country-master/country-master.component';
// import { VendorMasterData } from './Models/vendorMaterData';
import { MasterMenuListComponent } from './components/master-menu-list/master-menu-list.component';

const routes: Routes = [
  {
    path: "",
    component: MastersComponent,
    children: [

      { path: "pincode", component: PincodesComponent  },
    
      { path: "language", component:LanguageMasterTableComponent  },
      { path:'state', component:ListstateComponent },
      { path:'city', component:ListcityComponent },
      { path: "countrymaster", component: CountryMasterComponent },
      { path: "menu", component:MasterMenuListComponent},
 
      

      // { path : "inventory_transaction",component:InventoryTransactionmasterComponent},
      // { path: "inventory_master", component:InventorymasterComponent},
      // { path: "inventory_sub_category", component:InventorysubcategorymasterComponent},




    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersRoutingModule {}
