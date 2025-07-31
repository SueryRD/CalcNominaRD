import React, { useState, useMemo } from 'react';
import { PaymentFrequency, PayrollResult } from '../types';
import { calculateMonthlyPayroll } from '../services/payrollService';
import InputSection from './InputSection';
import ResultsSection from './ResultsSection';

const Calculator: React.FC = () => {
  const [grossSalaryStr, setGrossSalaryStr] = useState<string>('50000');
  const [frequency, setFrequency] = useState<PaymentFrequency>(PaymentFrequency.Monthly);
  const [isTaxExempt, setIsTaxExempt] = useState<boolean>(false);
  const [applyChristmasBonus, setApplyChristmasBonus] = useState<boolean>(true);

  const monthlyResults = useMemo(() => {
    const grossMonthly = parseFloat(grossSalaryStr) || 0;
    return calculateMonthlyPayroll(grossMonthly, isTaxExempt);
  }, [grossSalaryStr, isTaxExempt]);

  const periodResults: PayrollResult = useMemo(() => {
    let divisor = 1;
    switch (frequency) {
      case PaymentFrequency.BiWeekly: // Quincenal
        divisor = 2;
        break;
      case PaymentFrequency.Weekly:
        divisor = 52 / 12;
        break;
      case PaymentFrequency.EveryTwoWeeks: // Bisemanal
        divisor = 26 / 12;
        break;
      case PaymentFrequency.Monthly:
      default:
        divisor = 1;
        break;
    }
    
    return {
      gross: monthlyResults.grossMonthly / divisor,
      afp: monthlyResults.afpMonthly / divisor,
      sfs: monthlyResults.sfsMonthly / divisor,
      isr: monthlyResults.isrMonthly / divisor,
      totalDeductions: monthlyResults.totalDeductionsMonthly / divisor,
      net: monthlyResults.netMonthly / divisor,
    };
  }, [monthlyResults, frequency]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <InputSection
        grossSalaryStr={grossSalaryStr}
        setGrossSalaryStr={setGrossSalaryStr}
        frequency={frequency}
        setFrequency={setFrequency}
        isTaxExempt={isTaxExempt}
        setIsTaxExempt={setIsTaxExempt}
        applyChristmasBonus={applyChristmasBonus}
        setApplyChristmasBonus={setApplyChristmasBonus}
      />
      <ResultsSection results={periodResults} />
    </div>
  );
};

export default Calculator;