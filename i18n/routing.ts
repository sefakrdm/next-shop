import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['tr', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'tr',
  localePrefix: 'as-needed'
});
 
export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);