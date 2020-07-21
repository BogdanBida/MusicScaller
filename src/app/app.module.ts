import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TunerComponent } from './tuner/tuner.component';
import { StringedComponent } from './stringed/stringed.component';
import { PianoComponent } from './piano/piano.component';
import { ChordFinderComponent } from './chord-finder/chord-finder.component';
import { AudioAnalyzerComponent } from './audio-analyzer/audio-analyzer.component';
import { KalimbaComponent } from './kalimba/kalimba.component';
import { WindsComponent } from './winds/winds.component';
import { AboutComponent } from './about/about.component';
import { BlockFluteComponent } from './winds/block-flute/block-flute.component';
import { LipsHarmonicaComponent } from './winds/lips-harmonica/lips-harmonica.component';
import { TrumpetComponent } from './winds/trumpet/trumpet.component';

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
      TrumpetComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
