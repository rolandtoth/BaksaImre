import {NotFoundComponent} from './notfound/notfound.component'
import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import {BiographyComponent} from './biography/biography.component'
import {ContactComponent} from './contact/contact.component'
import {SiteMapComponent} from './sitemap/sitemap.component'

import {ItemComponent} from './item/item.component'
import {ItemResolver} from './services/item-resolver.service'
import {ItemsComponent} from './items/items.component'
import {ApiResolver} from './services/api-resolver.service'
import {PlaysResolver} from './services/plays-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    resolve: {data: ApiResolver}
  },
  {
    path: 'eloadas/:name',
    component: ItemComponent,
    resolve: {item: ItemResolver},
    data: {type: 'play'}
  },
  {
    path: 'kritika/:name',
    component: ItemComponent,
    resolve: {item: ItemResolver},
    data: {type: 'critic'}
  },
  {
    path: 'interju/:name',
    component: ItemComponent,
    resolve: {item: ItemResolver},
    data: {type: 'interview'}
  },
  {
    path: 'sitemap',
    component: SiteMapComponent
  },
  // {
  //   path: ':type/:name',
  //   component: ItemComponent,
  //   resolve: {item: ItemResolver}
  //   // runGuardsAndResolvers: 'pathParamsChange'
  // },
  {
    path: 'oneletrajz',
    component: BiographyComponent,
    resolve: {plays: PlaysResolver},
    data: {
      meta: {
        description: 'Baksa Imre munkássága évekre bontva'
      }
    }
  },
  {
    path: 'kapcsolat',
    component: ContactComponent,
    data: {
      meta: {
        description: 'Baksa Imre elérhetőségei'
      }
    }
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
  // {path: '404', component: Error404Component},
  // {path: '', redirectTo: '/events', pathMatch: 'full'},
  // {path: 'user', loadChildren: './user/user.module#UserModule'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
