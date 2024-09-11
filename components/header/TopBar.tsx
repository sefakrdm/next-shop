import React from 'react'
import { EnvelopeSimple, FacebookLogo, InstagramLogo, LinkedinLogo, Phone } from '@phosphor-icons/react/dist/ssr';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';

const TopBar:React.FC = () => {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <section className="mt-1">
      <div className="container">
        <div className="flex justify-between items-center h-10 border-b">
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-5 h-5">
            <a
              className="flex items-center space-x-0 md:space-x-1.5"
              href="mailto:info@bersa.com.tr"
            >
              <EnvelopeSimple size={18} />
              <span className="sr-only sm:not-sr-only">info@bersa.com.tr</span>
            </a>
            <Separator orientation="vertical" />
            <a
              className="flex items-center space-x-0 md:space-x-1.5"
              href="tel:902323283424"
            >
              <Phone size={18} />
              <span className="sr-only sm:not-sr-only">+90 (232) 328 3424</span>
            </a>
          </div>
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-4 h-5">
            <a className="" href="/tr/career">
              <InstagramLogo size={22} />
            </a>
            <a className="" href="/tr/career">
              <FacebookLogo size={22} />
            </a>
            <a className="" href="/tr/career">
              <LinkedinLogo size={22} />
            </a>
            <Separator orientation="vertical" />
            <LocaleSwitcherSelect defaultValue={locale}>
              {routing.locales.map((cur) => (
                <SelectItem key={cur} value={cur}>
                  {t('locale', {locale: cur})}
                </SelectItem>
              ))}
            </LocaleSwitcherSelect>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar