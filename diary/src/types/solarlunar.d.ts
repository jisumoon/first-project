declare module "solarlunar" {
  interface SolarDate {
    solarYear: number;
    solarMonth: number;
    solarDay: number;
  }

  interface LunarDate {
    lunarYear: number;
    lunarMonth: number;
    lunarDay: number;
    isLeapMonth: boolean;
  }

  function lunar2solar(
    lunarYear: number,
    lunarMonth: number,
    lunarDay: number,
    isLeapMonth: boolean
  ): SolarDate;

  function solarToLunar(
    solarYear: number,
    solarMonth: number,
    solarDay: number
  ): LunarDate;
}
