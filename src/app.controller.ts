import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { v4 as uuid4 } from 'uuid';
import { dataBase, ReportType } from './data';
import { randomUUID } from 'crypto';

@Controller('/report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return dataBase.report.filter((report) => {
      return report.type == reportType;
    });
    return [];
  }

  //get by id

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return dataBase.report
      .filter((report) => report.type == reportType)
      .find((report) => report.id);
    console.log(type, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },

    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid4(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    dataBase.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport() {
    return 'updated';
  }
  @Delete(':id')
  deleteReport() {
    return 'deleted';
  }
}
