import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PianoComponent } from './instruments/piano/piano.component';
import { StringedComponent } from './instruments/stringed/stringed.component';
import { TunerComponent } from './tuner/tuner.component';
import { AboutComponent } from './about/about.component';
import { ChordFinderComponent } from './chord-finder/chord-finder.component';
import { AudioAnalyzerComponent } from './audio-analyzer/audio-analyzer.component';
import { KalimbaComponent } from './instruments/kalimba/kalimba.component';
import { WindsComponent } from './instruments/winds/winds.component';
import { BlockFluteComponent } from './instruments/winds/block-flute/block-flute.component';
import { LipsHarmonicaComponent } from './instruments/winds/lips-harmonica/lips-harmonica.component';
import { TrumpetComponent } from './instruments/winds/trumpet/trumpet.component';
import { SaxophoneComponent } from './instruments/winds/saxophone/saxophone.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'tuner', component: TunerComponent
  },
  {
    path: 'stringed', component: StringedComponent
  },
  {
    path: 'piano', component: PianoComponent
  },
  {
    path: 'winds', component: WindsComponent,
    children: [
      {
        path: 'saxophone', component: SaxophoneComponent
      }, {
        path: 'block-flute', component: BlockFluteComponent
      },
      {
        path: 'harmonica', component: LipsHarmonicaComponent
      },
      {
        path: 'trumpet', component: TrumpetComponent
      }]
  },
  {
    path: 'chord-finder', component: ChordFinderComponent
  },
  {
    path: 'analyzer', component: AudioAnalyzerComponent
  },
  {
    path: 'kalimba', component: KalimbaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
