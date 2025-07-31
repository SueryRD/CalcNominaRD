// All values are as of 2024 regulations in Dominican Republic

// Tesorería de la Seguridad Social (TSS) Constants
export const AFP_RATE = 0.0287; // Pension Fund contribution rate
export const SFS_RATE = 0.0304; // Family Health Insurance contribution rate

export const SFS_MONTHLY_CAP = 167400.00; // Maximum monthly salary for SFS contribution
export const AFP_MONTHLY_CAP = 316080.00; // Maximum monthly salary for AFP contribution

// Impuesto Sobre la Renta (ISR) Brackets (Annual)
export const ISR_BRACKETS = [
  { limit: 416220.00, rate: 0, base: 0, over: 0 },
  { limit: 624329.00, rate: 0.15, base: 0, over: 416220.01 },
  { limit: 867123.00, rate: 0.20, base: 31216.00, over: 624329.01 },
  { limit: Infinity,   rate: 0.25, base: 79776.00, over: 867123.01 },
];
