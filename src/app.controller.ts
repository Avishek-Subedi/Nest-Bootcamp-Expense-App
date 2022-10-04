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
      if (type === 'income') {
        return report.type == reportType;
      }
    });
    return [];
  }

  //get by id

  @Get(':id')
  getReportById() {
    return {};
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
