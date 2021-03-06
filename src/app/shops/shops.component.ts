import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapInfoWindow } from '@angular/google-maps';
import { NzMarks } from 'ng-zorro-antd/slider';
import { ProxyService } from '../proxy/proxy.service';
import { BaseComponent } from '../shared/components/base.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { debounceTime } from "rxjs/operators";
@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent extends BaseComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  constructor(injector: Injector, private viewContainerRef: ViewContainerRef, private formBuilder: FormBuilder, private proxyService: ProxyService) {
    super(injector);
  }
  shopFilterForm: FormGroup;
  servicesFilterForm: FormGroup;
  markerOptions: google.maps.MarkerOptions = { draggable: false, animation: google.maps.Animation.BOUNCE, icon: 'https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/32/000000/external-barber-public-service-photo3ideastudio-flat-photo3ideastudio.png' };
  markerPositions: any = [];
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 7;
  selectedShop
  price = 0
  marks: NzMarks = {
    1: {
      style: {
        color: '#00FF00 '
      },
      label: '<strong>1$</strong>'
    },
    1000: {
      style: {
        color: '#f50'
      },
      label: '<strong>1000$</strong>'
    }
  };
  ngOnInit(): void {
    this.shopFilterForm = this.formBuilder.group({
      name: [null],
      city: [null],
      rate: [6],
    });
    this.servicesFilterForm = this.formBuilder.group({
      service_name: [null],
      cost: [1000],
    });
    this.getAllShop()
    this.shopFilterForm.valueChanges.pipe(debounceTime(400)).subscribe(el => {
      this.getShop()
    })
    this.servicesFilterForm.valueChanges.pipe(debounceTime(400)).subscribe(el => {
      this.getShop()
    })
    this.initMap()
  }

  getAllShop() {
    this.proxyService.getAllShop().subscribe(el => {
      this.markerPositions = el[0]
      this.initMap()
    })
  }

  getShop() {
    let input = {
      "shopFilterRequest": this.shopFilterForm.value,
      "servicesFilterRequest": this.servicesFilterForm.value
    }
    if (!input.shopFilterRequest.name && !input.shopFilterRequest.city) {
      delete input.shopFilterRequest
    }
    if (!input.servicesFilterRequest.service_name && !input.servicesFilterRequest.cost) {
      delete input.servicesFilterRequest
    }
    let uniqueIds = []
    this.proxyService.getAllShopByFilter(input).subscribe((el:any) => {
      this.markerPositions = el.flat().filter(element=>{
        const isDuplicate = uniqueIds.includes(element.id);
        if (!isDuplicate) {
          uniqueIds.push(element.id);
          return true;
        }
      })
      this.markerPositions.forEach(element => {
        element.shopServicesList = element.shopServicesList.filter(el=>{
          return el.cost <= input.servicesFilterRequest.cost
        })
      });
      this.markerPositions = this.markerPositions.filter(el=>el.shopServicesList.length>0)
      this.initMap()
    })
  }

  get haveLocation() {
    return this.markerPositions?.filter(el => el.lat)
  }

  initMap() {
    let latCenter = Number(this.markerPositions?.reduce((total, el) => Number(total) + Number(el.lat), 0) / this.haveLocation?.length)
    let lngCenter = Number(this.markerPositions?.reduce((total, el) => Number(total) + Number(el.lng), 0) / this.haveLocation?.length)
    this.center = { lat: latCenter, lng: lngCenter }
  }

  openInfoWindow(shop) {
    this.selectedShop = shop
    this.utility.modal.create({
      nzTitle: 'Book Service',
      nzContent: BookingServiceComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '40%',
      nzBodyStyle: {
        'max-height': '75vh',
        overflow: 'auto'
      },
      nzComponentParams: {
        shop: shop
      },
    })
  }

}
