import { Component, signal, inject, OnInit } from '@angular/core';
import { StatsService, IStat } from '../../services/stats.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html'
})
export class Stats implements OnInit {
  private statsService = inject(StatsService);

  stats = signal<IStat[]>([]);

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.statsService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => console.error('Error fetching real-time stats:', err)
    });
  }
}