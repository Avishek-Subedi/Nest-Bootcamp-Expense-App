import { Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { dataBase, ReportType } from './data';

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
  createReport() {
    return 'created';
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
