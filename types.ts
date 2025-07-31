export enum PaymentFrequency {
  Monthly = 'monthly',
  BiWeekly = 'biweekly', // Quincenal (twice a month)
  Weekly = 'weekly',
  EveryTwoWeeks = 'everytwoweeks', // Bisemanal (every 2 weeks)
}

export interface PayrollResult {
  gross: number;
  afp: number;
  sfs: number;
  isr: number;
  totalDeductions: number;
  net: number;
}
