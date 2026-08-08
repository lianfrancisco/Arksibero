import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TelemetryData {
  studentId: string;
  verificationBypassRate: boolean;
  shegRubricTier: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  getStudentData(): Observable<TelemetryData[]> {
    // Temporary mock telemetry data to test the UI chart and table
    return of([
      { studentId: 'Student_1899_01', verificationBypassRate: false, shegRubricTier: 'Mastery', timestamp: '2026-08-06' },
      { studentId: 'Student_1899_02', verificationBypassRate: true, shegRubricTier: 'Beginning', timestamp: '2026-08-06' },
      { studentId: 'Student_1899_03', verificationBypassRate: false, shegRubricTier: 'Emerging', timestamp: '2026-08-06' },
      { studentId: 'Student_1899_04', verificationBypassRate: false, shegRubricTier: 'Mastery', timestamp: '2026-08-06' },
      { studentId: 'Student_1899_05', verificationBypassRate: true, shegRubricTier: 'Emerging', timestamp: '2026-08-06' }
    ]);
  }
}