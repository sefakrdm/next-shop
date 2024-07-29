import React from 'react'
import { Metadata } from 'next';
import Form from './Form';

export const metadata: Metadata = {
  title: 'Giriş Yap',
}

export default async function LoginPage() {
  return <Form />
}