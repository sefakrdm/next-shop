import { cache } from "react";
import { db } from "../db";
import { SiteSettingTypes } from "@/utils/definitions";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const get = cache(async (): Promise<SiteSettingTypes | null> => {

  const settingData = await db.payment.findMany();

  if (!settingData || settingData.length === 0) {
    return null;
  } else {
    return settingData as unknown as SiteSettingTypes;
  }
});

const siteSettingService = {
  get,
}

export default siteSettingService;