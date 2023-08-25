import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
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
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const dataByType = data.report.filter((item) => item.type === reportType);
    return dataByType.find((report) => report.id === id);
  }

  /**
   *  The `createReport` method is a POST endpoint handler in the `AppController` class. It is used to create a new report.
   * The `@Post()` decorator is used to define a POST endpoint in the controller.
   * The `@Body()` decorator is used to define the body of the request.
   * In this case, it is defining the body of the request to be an object with the properties `amount` and `source`.
   */
  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
  }

  /**
   * The `@Put(':id')` decorator is used to define a PUT endpoint in the controller. It specifies that this endpoint will handle HTTP PUT requests and expects an `id` parameter in the URL.
   */
  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report
      .filter((item) => item.type === reportType)
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
    };
    return data.report[reportIndex];
  }
  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
