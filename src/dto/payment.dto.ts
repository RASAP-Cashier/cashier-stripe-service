import { IsNumber, IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  currency?: string;

  @IsNumber()
  amount?: number;
}
