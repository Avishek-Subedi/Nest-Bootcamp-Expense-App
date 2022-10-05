import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import {
  ReportResponseDto,
  CreateReportDto,
  updateReportDto,
} from '../dtos/report.dto';
import { ReportType } from '../data';
import { ReportService } from './report.service';

@Controller('/report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(@Param('type') type: string): ReportResponseDto[] {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,

    @Param('type') type: string,
  ): ReportResponseDto {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: updateReportDto,
  ): ReportResponseDto {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
