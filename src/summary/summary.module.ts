import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import {} from 'src/report/report.service';
import { ReportService } from '../report/report.service';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
