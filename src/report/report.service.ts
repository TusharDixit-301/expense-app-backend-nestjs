import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, data } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto';

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
    return data.report
      .filter((item) => item.type === type)
      .map((report) => new ReportResponseDto(report));
  }
  getReportById(type: ReportType, id: string): ReportResponseDto {
    const dataByType = data.report.filter((item) => item.type === type);
    const report = dataByType.find((item) => item.id === id);
    if (!report) {
      return null;
    }
    return new ReportResponseDto(report);
  }
  createReport(
    type: ReportType,
    { amount, source }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      amount,
      source,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(type: ReportType, id: string, body: UpdateReport) {
    const reportToUpdate = data.report
      .filter((item) => item.type === type)
      .find((report) => report.id === id);
    if (!reportToUpdate) {
      return 'Report not found';
    }
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updatedAt: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      return 'Report not found';
    }
    data.report.splice(reportIndex, 1);
    return 'Report deleted successfully';
  }
}
