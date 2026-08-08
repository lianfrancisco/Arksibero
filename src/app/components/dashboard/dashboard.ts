import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TelemetryService, TelemetryData } from '../../services/telemetry';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  studentLogs: TelemetryData[] = [];

  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mastery', 'Emerging', 'Beginning'],
    datasets: [
      { 
        data: [0, 0, 0], 
        label: 'Stanford SHEG Rubric Tier Distribution',
        backgroundColor: ['#4caf50', '#ff9800', '#f44336']
      }
    ]
  };

  constructor(private telemetryService: TelemetryService) {}

  ngOnInit(): void {
    this.telemetryService.getStudentData().subscribe({
      next: (data: TelemetryData[]) => {
        this.studentLogs = data;
        this.updateChartData(data);
      },
      error: (err: unknown) => console.error('Error loading telemetry:', err)
    });
  }

  private updateChartData(data: TelemetryData[]): void {
    const counts = { Mastery: 0, Emerging: 0, Beginning: 0 };
    
    data.forEach(log => {
      if (counts[log.shegRubricTier as keyof typeof counts] !== undefined) {
        counts[log.shegRubricTier as keyof typeof counts]++;
      }
    });
    
    this.chartData.datasets[0].data = [counts.Mastery, counts.Emerging, counts.Beginning];
  }
}