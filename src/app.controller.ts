import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportType, data } from './data';
@Controller('/report/:type')
export class AppController {
  /**
   * The `@Get()` decorator is used to define a GET endpoint in the controller
   * In this case, it is defining a GET endpoint for retrieving all reports.
   */
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((item) => item.type === reportType);
  }

  /** 
    * The `@Get(':id')` decorator is used to define a GET endpoint for retrieving a specific report by its ID. 
    * The `@Param('id')` decorator is used to define a parameter in the endpoint URL.
    * In this case, it is defining a parameter called `id` in the endpoint URL.
  */
  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: number) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const dataByType = data.report.filter((item) => item.type === reportType);
    return dataByType.find((report) => report.id === Number(id));
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
