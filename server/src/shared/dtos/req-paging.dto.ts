import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqPagingDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  skip: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  take: number;
}
