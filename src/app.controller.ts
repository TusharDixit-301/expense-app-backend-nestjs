import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportType, data } from './data';
@Controller('/report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((item) => item.type === reportType);
  }
  @Get(':id')
  getReportById() {
    return {};
  }
  @Post()
  createReport() {
    return 'Created';
  }
  @Put(':id')
  updateReport() {
    return 'Updated';
  }
  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
