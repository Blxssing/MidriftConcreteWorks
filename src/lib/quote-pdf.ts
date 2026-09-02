import { site } from "@/data/site";

export type QuotationPdfData = {
  reference: string;
  fullName: string;
  phone: string;
  email?: string;
  product: string;
  quantityLabel?: string;
  locationText: string;
  mapsLink?: string;
  timeframe?: string;
  notes?: string;
};

/** File name used for the downloaded quotation, e.g. Midrift-Quotation-MID-QR-2026-0007.pdf */
export function quotationFileName(reference: string) {
  return `Midrift-Quotation-${reference}.pdf`;
}

/**
 * Builds a branded, single-page quotation request PDF in the browser and
 * triggers a download. jsPDF is imported lazily so it never ships in the
 * initial bundle.
 */
export async function downloadQuotationPdf(data: QuotationPdfData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const M = 48;
  let y = 0;

  // Header band
  doc.setFillColor(24, 32, 40);
  doc.rect(0, 0, pageW, 108, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(site.name, M, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(site.tagline, M, 68);
  doc.text(`${site.location}  ·  ${site.phone}  ·  ${site.email}`, M, 86);

  y = 150;
  doc.setTextColor(24, 32, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Quotation Request", M, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 100, 110);
  doc.text(
    `Reference: ${data.reference}   ·   Date: ${new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`,
    M,
    y + 18,
  );

  y += 44;
  doc.setDrawColor(215, 220, 224);
  doc.line(M, y, pageW - M, y);
  y += 26;

  const rows: Array<[string, string]> = [
    ["Customer", data.fullName],
    ["Phone", data.phone],
    ...(data.email ? ([["Email", data.email]] as Array<[string, string]>) : []),
    ["Product", data.product],
    ["Quantity", data.quantityLabel ?? "To be confirmed"],
    ["Delivery location", data.locationText],
    ...(data.mapsLink ? ([["Map link", data.mapsLink]] as Array<[string, string]>) : []),
    ["Required by", data.timeframe ?? "Flexible"],
    ...(data.notes ? ([["Project notes", data.notes]] as Array<[string, string]>) : []),
  ];

  const labelW = 130;
  const valueW = pageW - M * 2 - labelW;

  for (const [label, value] of rows) {
    const lines = doc.splitTextToSize(String(value), valueW) as string[];
    const blockH = Math.max(18, lines.length * 14);

    doc.setTextColor(120, 128, 136);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(label.toUpperCase(), M, y);

    doc.setTextColor(24, 32, 40);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(lines, M + labelW, y);

    y += blockH + 10;
    doc.setDrawColor(235, 238, 240);
    doc.line(M, y - 8, pageW - M, y - 8);
  }

  y += 14;
  doc.setFillColor(245, 247, 248);
  doc.roundedRect(M, y, pageW - M * 2, 96, 12, 12, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(24, 32, 40);
  doc.text("What happens next", M + 18, y + 26);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 90, 100);
  doc.text(
    doc.splitTextToSize(
      "Our sales team confirms availability, pricing and delivery for the items above and replies on WhatsApp, phone or email. Please quote the reference number in any follow-up. Prices are confirmed in writing before dispatch.",
      pageW - M * 2 - 36,
    ) as string[],
    M + 18,
    y + 46,
  );

  doc.setFontSize(9);
  doc.setTextColor(140, 148, 156);
  doc.text(
    `${site.name}  ·  ${site.address}  ·  ${site.hours}`,
    M,
    doc.internal.pageSize.getHeight() - 40,
    { maxWidth: pageW - M * 2 },
  );

  doc.save(quotationFileName(data.reference));
}
