import { Injectable, Body } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from 'rxjs';
import { ReportResponseDto } from '../dtos/report.dto';
import { ReportType, dataBase } from '../data';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return dataBase.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = dataBase.report
      .filter((report) => report.type == type)
      .find((report) => report.id);

    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuidv4(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    dataBase.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ReportResponseDto {
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
    return new ReportResponseDto(dataBase.report[reportIndex]);
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
