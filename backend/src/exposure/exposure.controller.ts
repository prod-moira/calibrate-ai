import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { DiscoveryResponse } from '@shared';

import { DiscoverDto } from './discover.dto';
import { ExposureService } from './exposure.service';
import { ServiceError } from './service-error';

@Controller('exposure')
export class ExposureController {
  constructor(private readonly service: ExposureService) {}

  @Post('discover')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async discover(@Body() dto: DiscoverDto): Promise<DiscoveryResponse> {
    try {
      return await this.service.discover(dto.quizResult, dto.stabilityPriority);
    } catch (err) {
      if (err instanceof ServiceError) {
        if (err.type === 'PROMPT_CONSTRUCTION_ERROR') {
          throw new HttpException(
            'Internal server error.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        // GEMINI_API_ERROR, GEMINI_TIMEOUT_ERROR, PARSE_FAILURE, SCHEMA_VIOLATION, EMPTY_RESULT
        throw new HttpException(
          'Career generation is temporarily unavailable. Please retake the quiz.',
          HttpStatus.BAD_GATEWAY,
        );
      }
      // Unrecognised errors → HTTP 500
      throw new HttpException(
        'Internal server error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
