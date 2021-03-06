import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TunerComponent } from './tuner/tuner.component';
import { StringedComponent } from './instruments/stringed/stringed.component';
import { PianoComponent } from './instruments/piano/piano.component';
import { ChordFinderComponent } from './chord-finder/chord-finder.component';
import { AudioAnalyzerComponent } from './audio-analyzer/audio-analyzer.component';
import { KalimbaComponent } from './instruments/kalimba/kalimba.component';
import { WindsComponent } from './instruments/winds/winds.component';
import { AboutComponent } from './about/about.component';
import { BlockFluteComponent } from './instruments/winds/block-flute/block-flute.component';
import { LipsHarmonicaComponent } from './instruments/winds/lips-harmonica/lips-harmonica.component';
import { TrumpetComponent } from './instruments/winds/trumpet/trumpet.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LinkToHomeComponent } from './link-to-home/link-to-home.component';
import { HomeSidebarComponent } from './home/home-sidebar/home-sidebar.component';
import { MusicscaleSettingsComponent } from './musicscale-settings/musicscale-settings.component';
import { WindsMenuComponent } from './instruments/winds/winds-menu/winds-menu.component';
import { NoteColorPipe } from './notecolor.pipe';
import { NoteNamePipe } from './notename.pipe';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      AboutComponent,
      TunerComponent,
      StringedComponent,
      PianoComponent,
      ChordFinderComponent,
      AudioAnalyzerComponent,
      KalimbaComponent,
      WindsComponent,
      BlockFluteComponent,
      LipsHarmonicaComponent,
      TrumpetComponent,
      LinkToHomeComponent,
      HomeSidebarComponent,
      MusicscaleSettingsComponent,
      WindsMenuComponent,
      NoteColorPipe,
      NoteNamePipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
