import { AFP_MONTHLY_CAP, AFP_RATE, SFS_MONTHLY_CAP, SFS_RATE, ISR_BRACKETS } from '../constants';

interface MonthlyPayrollResult {
  grossMonthly: number;
  afpMonthly: number;
  sfsMonthly: number;
  isrMonthly: number;
  totalDeductionsMonthly: number;
  netMonthly: number;
}

export const calculateMonthlyPayroll = (
  grossMonthlySalary: number,
  isTaxExempt: boolean
): MonthlyPayrollResult => {
  if (grossMonthlySalary <= 0) {
    return {
      grossMonthly: 0,
      afpMonthly: 0,
      sfsMonthly: 0,
      isrMonthly: 0,
      totalDeductionsMonthly: 0,
      netMonthly: 0,
    };
  }

  // 1. Calculate TSS Deductions (AFP & SFS)
  const afpMonthly = Math.min(grossMonthlySalary, AFP_MONTHLY_CAP) * AFP_RATE;
  const sfsMonthly = Math.min(grossMonthlySalary, SFS_MONTHLY_CAP) * SFS_RATE;

  // 2. Calculate ISR (Income Tax)
  let isrMonthly = 0;
  if (!isTaxExempt) {
    const taxableBaseMonthly = grossMonthlySalary - afpMonthly - sfsMonthly;
    
    if (taxableBaseMonthly > 0) {
      const taxableBaseAnnual = taxableBaseMonthly * 12;

      let isrAnnual = 0;
      if (taxableBaseAnnual > ISR_BRACKETS[0].limit) {
        if (taxableBaseAnnual <= ISR_BRACKETS[1].limit) {
          isrAnnual = (taxableBaseAnnual - (ISR_BRACKETS[1].over - 1)) * ISR_BRACKETS[1].rate;
        } else if (taxableBaseAnnual <= ISR_BRACKETS[2].limit) {
          isrAnnual = ISR_BRACKETS[2].base + (taxableBaseAnnual - (ISR_BRACKETS[2].over - 1)) * ISR_BRACKETS[2].rate;
        } else {
          isrAnnual = ISR_BRACKETS[3].base + (taxableBaseAnnual - (ISR_BRACKETS[3].over - 1)) * ISR_BRACKETS[3].rate;
        }
      }
      isrMonthly = isrAnnual / 12;
    }
  }

  // 3. Calculate Totals
  const totalDeductionsMonthly = afpMonthly + sfsMonthly + isrMonthly;
  const netMonthly = grossMonthlySalary - totalDeductionsMonthly;

  return {
    grossMonthly: grossMonthlySalary,
    afpMonthly,
    sfsMonthly,
    isrMonthly,
    totalDeductionsMonthly,
    netMonthly,
  };
};