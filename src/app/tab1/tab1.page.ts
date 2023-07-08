import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  enabled = this.analyticsService.analyticsEnabled;

  constructor(private analyticsService: AnalyticsService) { }

  setUser() {
   this.analyticsService.setUser();
  }

  setProperty() {
    this.analyticsService.setProperty();
  }

  logEvent() {
    this.analyticsService.logEvent();
  }


  toggleDataCollection() {
    this.analyticsService.toggleAnalytics();
    this.enabled = this.analyticsService.analyticsEnabled;
  }
}
