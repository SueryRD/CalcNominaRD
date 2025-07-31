import React from 'react';
import { PaymentFrequency } from '../types';
import ToggleSwitch from './ToggleSwitch';

interface InputSectionProps {
  grossSalaryStr: string;
  setGrossSalaryStr: (value: string) => void;
  frequency: PaymentFrequency;
  setFrequency: (value: PaymentFrequency) => void;
  isTaxExempt: boolean;
  setIsTaxExempt: (value: boolean) => void;
  applyChristmasBonus: boolean;
  setApplyChristmasBonus: (value: boolean) => void;
}

const frequencyOptions = [
  { id: PaymentFrequency.Monthly, label: 'Mensual' },
  { id: PaymentFrequency.BiWeekly, label: 'Quincenal' },
  { id: PaymentFrequency.Weekly, label: 'Semanal' },
  { id: PaymentFrequency.EveryTwoWeeks, label: 'Bisemanal' },
];

const InputSection: React.FC<InputSectionProps> = ({
  grossSalaryStr,
  setGrossSalaryStr,
  frequency,
  setFrequency,
  isTaxExempt,
  setIsTaxExempt,
  applyChristmasBonus,
  setApplyChristmasBonus,
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-6 border border-gray-700">
      <div>
        <label htmlFor="gross-salary" className="block text-sm font-medium text-gray-300 mb-2">
          Sueldo Bruto Mensual
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 sm:text-sm">RD$</span>
          </div>
          <input
            type="text"
            id="gross-salary"
            className="w-full bg-gray-900 border border-gray-600 rounded-md py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="50000.00"
            value={grossSalaryStr}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                 setGrossSalaryStr(value);
              }
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Frecuencia de Pago
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {frequencyOptions.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="payment-frequency"
                value={option.id}
                checked={frequency === option.id}
                onChange={() => setFrequency(option.id)}
                className="peer hidden"
              />
              <label
                htmlFor={option.id}
                className="block w-full text-center py-2 px-3 rounded-md text-sm font-medium border border-gray-600 cursor-pointer transition-all duration-200 ease-in-out
                           peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600
                           hover:bg-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 pt-2">
        <ToggleSwitch
            label="Aplica para regalía pascual?"
            enabled={applyChristmasBonus}
            setEnabled={setApplyChristmasBonus}
            description="No afecta el cálculo de nómina actual."
        />
        <ToggleSwitch
            label="¿Es un salario técnico exento de ISR?"
            enabled={isTaxExempt}
            setEnabled={setIsTaxExempt}
            description="Excluye el ISR del cálculo de deducciones."
        />
      </div>
    </div>
  );
};

export default InputSection;