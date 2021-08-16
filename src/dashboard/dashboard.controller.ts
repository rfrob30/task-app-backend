import { Get, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.dashboardService.getSummary();
  }
}
