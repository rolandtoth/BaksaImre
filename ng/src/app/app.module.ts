import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule} from '@angular/common/http'

import {AppRoutingModule} from './app-routing.module'

import {ApiService} from './services/api.service'
import {DataService} from './services/data.service'
import {ApiResolver} from './services/api-resolver.service'
import {ItemResolver} from './services/item-resolver.service'
import {TitleService} from './services/title.service'
import {AssetLoaderService} from './services/asset-loader.service'

import {AppComponent} from './app.component'
import {ItemComponent} from './item/item.component'
import {ItemsComponent} from './items/items.component'
import {ItemListComponent} from './item-list/item-list.component'
import {MastheadComponent} from './masthead/masthead.component'
import {YearListComponent} from './year-list/year-list.component'

import {SafeHtmlPipe} from './shared/pipes/safe-html.pipe'
import {ItemTypePipe} from './shared/pipes/item-type.pipe'
import {BiographyComponent} from './biography/biography.component'
import {PlaysResolver} from './services/plays-resolver.service'
import {GroupByPipe} from './shared/pipes/groupby.pipe'
import {ReversePipe} from './shared/pipes/reverse.pipe'
import {ExcerptPipe} from './shared/pipes/excerpt.pipe'
import {SvgIconComponent} from './shared/svg-icon/svg-icon.component'
import {ContactComponent} from './contact/contact.component'
import {NotFoundComponent} from './notfound/notfound.component'
import {InlineSvgPipe} from './shared/pipes/inline-svg.pipe'
import {EmbedVideoComponent} from './shared/embed-video/embed-video.component'
import {ImageUrlPipe} from './shared/pipes/image-url.pipe'
import {ItemMetaComponent} from './shared/item-meta/item-meta.component'
import {PictureComponent} from './shared/picture/picture.component'
import {SiteMapComponent} from './sitemap/sitemap.component'
import {SharingButtonsComponent} from './shared/sharing-buttons/sharing-buttons.component'
import {ButttonFocusRemover} from './shared/button-focus-remover.directive'

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemComponent,
    ItemTypePipe,
    ItemListComponent,
    MastheadComponent,
    SafeHtmlPipe,
    YearListComponent,
    BiographyComponent,
    GroupByPipe,
    ReversePipe,
    ExcerptPipe,
    SvgIconComponent,
    ContactComponent,
    NotFoundComponent,
    InlineSvgPipe,
    EmbedVideoComponent,
    ImageUrlPipe,
    ItemMetaComponent,
    PictureComponent,
    SiteMapComponent,
    SharingButtonsComponent,
    ButttonFocusRemover
  ],
  providers: [
    HttpClientModule,
    ApiService,
    ItemResolver,
    PlaysResolver,
    ApiResolver,
    TitleService,
    ItemTypePipe,
    DataService,
    ExcerptPipe,
    AssetLoaderService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
