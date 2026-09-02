import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Phone } from "lucide-react";
import { allProducts } from "@/data/products";
import { salesReps, repTelLink, repWhatsappLink } from "@/data/sales";


const projectTypes = [
  "Residential / home build",
  "Commercial development",
  "Contractor / civil works",
  "Government / infrastructure",
  "Hardware store / distributor",
  "Other",
];

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent";
const labelCls = "mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground";

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    product: defaultProduct ?? "",
    quantity: "",
    projectType: "",
    location: "",
    date: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = `QUOTE REQUEST
Name: ${form.name}
Company: ${form.company}
Phone: ${form.phone}
Email: ${form.email}
Product: ${form.product}
Quantity: ${form.quantity}
Project type: ${form.projectType}
Delivery location: ${form.location}
Required by: ${form.date}
Notes: ${form.notes}`;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.product) {
      toast.error("Please fill in your name, phone number and product.");
      return;
    }
    setSent(true);
    toast.success("Almost done — choose the salesperson who should receive your quote.");
    requestAnimationFrame(() => {
      document.getElementById("rep-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }


  return (
    <form onSubmit={onSubmit} className="soft-card border border-hairline bg-card p-6 md:p-10">
      <p className="eyebrow">Request a quote</p>
      <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">Tell us what you need</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Complete the form and we will respond with a written quotation. Fields marked * are required.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="q-name">Full name *</label>
          <input id="q-name" className={field} value={form.name} onChange={set("name")} required />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-company">Company</label>
          <input id="q-company" className={field} value={form.company} onChange={set("company")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-phone">Phone *</label>
          <input id="q-phone" type="tel" className={field} value={form.phone} onChange={set("phone")} required />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-email">Email</label>
          <input id="q-email" type="email" className={field} value={form.email} onChange={set("email")} />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-product">Product *</label>
          <select id="q-product" className={field} value={form.product} onChange={set("product")} required>
            <option value="">Select a product</option>
            {allProducts.map((p) => (
              <option key={p.category + p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Multiple products / not sure">Multiple products / not sure</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="q-qty">Quantity</label>
          <input
            id="q-qty"
            className={field}
            placeholder="e.g. 500 m² or 2,000 pcs"
            value={form.quantity}
            onChange={set("quantity")}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-type">Project type</label>
          <select id="q-type" className={field} value={form.projectType} onChange={set("projectType")}>
            <option value="">Select project type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="q-loc">Delivery location</label>
          <input id="q-loc" className={field} value={form.location} onChange={set("location")} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="q-date">Required by</label>
          <input id="q-date" type="date" className={field} value={form.date} onChange={set("date")} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="q-notes">Project details</label>
          <textarea id="q-notes" rows={4} className={field} value={form.notes} onChange={set("notes")} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Send quote request
      </button>
      {sent && (
        <p className="mt-4 text-sm text-muted-foreground">
          Your request opens in WhatsApp so our sales team receives it instantly. Prefer email? Send the same details to
          our sales address below.
        </p>
      )}
    </form>
  );
}
