import { ReportType, dataBase } from './data';

import { Injectable, Body } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'rxjs';

interface Report {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return dataBase.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return dataBase.report
      .filter((report) => report.type == type)
      .find((report) => report.id);
    console.log(type, id);
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuidv4(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    dataBase.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: Report) {
    const reportToUpdate = dataBase.report
      .filter((report) => report.type == type)
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
      updated_at: new Date(),
    };

    return dataBase.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = dataBase.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      throw NotFoundError;
    }
    dataBase.report.splice(reportIndex, 1);
    return;
  }
}
