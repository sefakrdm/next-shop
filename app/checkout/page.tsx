import React from 'react'
import CheckoutPageClient from './CheckoutPage'
import addressService from '@/lib/service/addressService';
import { auth } from '@/lib/auth';
import shippingService from '@/lib/service/shippingService';
import paymentService from '@/lib/service/paymentService';

const CheckoutPage = async () => {

  const session = await auth();

  const addresses = await addressService.getByUserId(session?.user._id ?? '');
  const shippings = await shippingService.getAll();
  const payments = await paymentService.getAll();

  return (
    <CheckoutPageClient addresses={addresses || []} shippings={shippings || []} payments={payments || []} />
  )
}

export default CheckoutPage