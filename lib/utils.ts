import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import slugify from "slugify";
import bcrypt from "bcryptjs";

interface ConversionRates {
  [key: string]: { [key: string]: number };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function priceFormat(fromCurrency: string, toCurrency: string, locale: Intl.LocalesArgument, price: number) {

  if(!fromCurrency && !toCurrency && !price) return null;

  const conversionRates: ConversionRates = {
      'TRY': {'TRY': 1, 'USD': 0.031, 'EUR': 0.029},
      'USD': {'USD': 1, 'TRY': 32.28, 'EUR': 0.93},
      'EUR': {'EUR':1, 'TRY': 10.12, 'USD': 1.20}
  };

  // Giriş para birimi ve hedef para birimi doğru mu kontrol edin
  if (!conversionRates[fromCurrency] || !conversionRates[fromCurrency][toCurrency]) {
      return "Hatalı para birimi";
  }

  // Fiyat dönüşümünü yapın
  const convertedPrice = price * conversionRates[fromCurrency][toCurrency];


  return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: toCurrency,
  }).format(convertedPrice).replace(/^(\D+)/, '$1 ');
};

export function formattedPrice(locale: string, toCurrency: string, price: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: toCurrency,
  })
    .format(price)
    .replace(/^(\D+)/, "$1 ");
}

export function slugFn(str: string) {
  return slugify(str, { replacement: '-', lower: true, strict: true });
}

export function saltAndHashPassword(password: any) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}