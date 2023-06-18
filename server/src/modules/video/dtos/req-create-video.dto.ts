import { IsNotEmpty, IsString } from 'class-validator';

export class ReqCreateVideoDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
