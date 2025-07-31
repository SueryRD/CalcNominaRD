import React from 'react';
import { PayrollResult } from '../types';

interface ResultsSectionProps {
  results: PayrollResult;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ResultRow: React.FC<{ label: string; value: number; isTotal?: boolean; isNet?: boolean }> = ({ label, value, isTotal = false, isNet = false }) => {
  const valueColor = isNet ? 'text-green-400' : 'text-white';
  const labelColor = isTotal || isNet ? 'text-gray-200' : 'text-gray-400';
  const fontWeight = isTotal || isNet ? 'font-semibold' : 'font-normal';

  return (
    <div className="flex justify-between items-center py-2">
      <p className={`${labelColor} ${fontWeight}`}>{label}</p>
      <p className={`${valueColor} ${fontWeight}`}>
        {label.toLowerCase().includes('deducciones') ? '-' : ''}RD$ {formatCurrency(value)}
      </p>
    </div>
  );
};

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-200">Resumen de Ingresos y Deducciones</h2>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider pb-1 border-b border-gray-700">Ingresos</h3>
          <ResultRow label="Sueldo Bruto" value={results.gross} />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider pb-1 border-b border-gray-700">Deducciones</h3>
          <div className="pl-2 border-l-2 border-gray-700/50">
            <ResultRow label="AFP (2.87%)" value={results.afp} />
            <ResultRow label="SFS (3.04%)" value={results.sfs} />
            <ResultRow label="ISR" value={results.isr} />
          </div>
          <div className="border-t border-gray-700 mt-2">
             <ResultRow label="Total Deducciones" value={results.totalDeductions} isTotal />
          </div>
        </div>
        
        <div className="pt-3">
            <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30">
                <p className="text-lg font-bold text-white">Sueldo Neto a Recibir</p>
                <p className="text-2xl font-bold text-green-400">RD$ {formatCurrency(results.net)}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;