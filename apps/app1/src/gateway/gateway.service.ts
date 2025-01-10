import { Injectable } from '@nestjs/common';

import { Logger, LoggerService } from '@app/logger';

@Injectable()
export class GatewayService {
  private readonly logger: Logger;

  constructor(private readonly loggerService: LoggerService) {
    this.logger = this.loggerService.getLogger(GatewayService.name);
  }
}
