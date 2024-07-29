import React from 'react';
import Form from './Form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kaydol',
}

export default async function RegisterPage() {
  return <Form />
}