declare module "solarlunar" {
  export function lunar2solar(
    lunarYear: number,
    lunarMonth: number,
    lunarDay: number,
    isLeapMonth: boolean
  ): {
    solarYear: number;
    solarMonth: number;
    solarDay: number;
  };

  export function solarToLunar(
    solarYear: number,
    solarMonth: number,
    solarDay: number
  ): {
    lunarYear: number;
    lunarMonth: number;
    lunarDay: number;
    isLeapMonth: boolean;
  };

  const solarlunar: {
    lunar2solar: typeof lunar2solar;
    solarToLunar: typeof solarToLunar;
  };
  export default solarlunar;
}
