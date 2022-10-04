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
import { dataBase, ReportType } from './data';
import { AppService } from './app.service';
import { ReportResponseDto } from './dtos/report.dto';
import { CreateReportDto, updateReportDto } from './dtos/report.dto';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string): ReportResponseDto[] {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,

    @Param('type') type: string,
  ): ReportResponseDto {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: updateReportDto,
  ): ReportResponseDto {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
