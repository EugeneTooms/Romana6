import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { LocationsService } from './locations.services';
import { Location } from './location.model';

@Component({
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy {
  locations: Location[] = [];
  private locationsSub: Subscription;
  isLoading = true;

  constructor (public locationsService: LocationsService) {}
  ngOnInit() {
    this.locationsService.getLocations();
    this.locationsSub = this.locationsService.getLocationsListener()
      .subscribe( (locations: Location[]) => {
        this.locations = locations.filter(x => x.position.length === 1);
        this.isLoading = false;
      }, () => {this.isLoading = false; });
  }
  AddLocation(form: NgForm) {
    const newLocation: Location = {
      id: null,
      location_name: form.value.naziv,
      position: (this.locations.length + 1).toString()
    };
    this.locationsService.addLocation(newLocation);
  }
  ngOnDestroy() {
    this.locationsSub.unsubscribe();
  }

}

