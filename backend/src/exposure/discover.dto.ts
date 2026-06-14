import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsInt,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { AnswerCategory } from '@shared';

export class AnswerCountsDto {
  @IsInt()
  @Min(0)
  Analytical: number;

  @IsInt()
  @Min(0)
  Creative: number;

  @IsInt()
  @Min(0)
  Leadership: number;

  @IsInt()
  @Min(0)
  People: number;
}

export class StepSummaryDto {
  @IsIn(['Analytical', 'Creative', 'Leadership', 'People'])
  dominantCategory: AnswerCategory;

  @ValidateNested()
  @Type(() => AnswerCountsDto)
  answerCounts: AnswerCountsDto;
}

export class DiscoverDto {
  @ValidateNested({ each: true })
  @Type(() => StepSummaryDto)
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  quizResult: StepSummaryDto[];

  @IsInt()
  @Min(1)
  @Max(5)
  stabilityPriority: number;
}
