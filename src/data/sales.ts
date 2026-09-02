export type SalesRep = {
  name: string;
  role: string;
  phone: string;
  /** International format without the leading + , for wa.me links */
  whatsapp: string;
};

export const salesReps: SalesRep[] = [
  { name: "Patrick", role: "Sales", phone: "0705736512", whatsapp: "254705736512" },
  { name: "Caleb", role: "Sales", phone: "0791502707", whatsapp: "254791502707" },
  { name: "Nathaniel", role: "Sales", phone: "0701755069", whatsapp: "254701755069" },
  { name: "Jane", role: "Sales", phone: "0715293439", whatsapp: "254715293439" },
  { name: "John", role: "Sales", phone: "0746422136", whatsapp: "254746422136" },
];

export const repWhatsappLink = (rep: SalesRep, message: string) =>
  `https://wa.me/${rep.whatsapp}?text=${encodeURIComponent(message)}`;

export const repTelLink = (rep: SalesRep) => `tel:+${rep.whatsapp}`;
