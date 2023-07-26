import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetricConverterService {

  constructor() { }

  lbsToKgs(lbs: number): number {
    // 1 lb is approximately equal to 0.45359237 kg
    return parseFloat((lbs * 0.45359237).toFixed(1));
  }

  kgsToLbs(kgs: number): number {
    // 1 kg is approximately equal to 2.20462262 lbs
    return parseFloat((kgs * 2.20462262).toFixed(1));
  }

  feetToMeters(feet: number): number {
    // 1 foot is equal to 0.3048 meters
    
    return parseFloat((feet * 0.3048).toFixed(1));
  }

  metersToFeet(meters: number): number {
    // 1 meter is equal to 3.28084 feet
    return parseFloat((meters * 3.28084).toFixed(1));
  }
}
