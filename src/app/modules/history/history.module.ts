import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { SearchComponent } from './componets/search/search.component';
import { PlayListHeaderComponent } from '@shared/components/play-list-header/play-list-header.component';
import { SharedModule } from '@shared/shared.module';
import { FavoritesPageComponent } from '@modules/favorites/pages/favorites-page/favorites-page.component';
import { PlayListBodyComponent } from '@shared/components/play-list-body/play-list-body.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoryPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class HistoryModule { }
