import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { v4 as uuidv4 } from 'uuid';
import { dataBase, ReportType } from './data';
import { NotFoundError } from 'rxjs';

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
      id: uuidv4(),
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
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type == 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = dataBase.report
      .filter((report) => report.type == reportType)
      .find((report) => report.id);

    if (!reportToUpdate) {
      throw NotFoundError;
    }
    const reportIndex = dataBase.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    dataBase.report[reportIndex] = {
      ...dataBase.report[reportIndex],
      ...body,
    };

    return dataBase.report[reportIndex];

    //
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = dataBase.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      throw NotFoundError;
    }
    dataBase.report.splice(reportIndex, 1);
    return;
  }
}
