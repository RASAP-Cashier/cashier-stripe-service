import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class AppService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async stripePay(paymentDto: PaymentDto) {
    try {
      const initPayment = await this.stripe.paymentIntents.create({
        amount: paymentDto.amount * 100,
        currency: paymentDto.currency,
      });

      // to be implemented

      const accet = await this.stripe.paymentIntents.confirm(initPayment.id, {
        payment_method: 'pm_card_visa',
        return_url: 'https://www.example.com',
      });
      return accet;
    } catch (error) {
      throw new Error(error);
    }
  }
}
