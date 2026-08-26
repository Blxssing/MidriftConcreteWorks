import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { categories } from "@/data/products";
import { site, whatsappLink, emailLink } from "@/data/site";
import { track } from "@/lib/analytics";

const projectTypes = [
  "Residential / home build",
  "Commercial development",
  "Contractor / civil works",
  "Government / infrastructure",
  "Hardware store / distributor",
  "Other",
];

const units = ["pieces", "m²", "m³", "linear m", "pallets", "trips / loads"];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  company: z.string().trim().max(100, "Company name is too long"),
  phone: z
    .string()
    .trim()
    .min(9, "Enter a valid phone number")
    .max(20, "Enter a valid phone number")
    .regex(/^[0-9+()\s-]+$/, "Phone can only contain digits, spaces, + ( ) -"),
  email: z.union([z.string().trim().email("Enter a valid email address").max(150), z.literal("")]),
  category: z.string().trim().min(1, "Select a product family"),
  product: z.string().trim().min(1, "Select a product"),
  quantity: z
    .string()
    .trim()
    .max(20, "Quantity is too long")
    .regex(/^[0-9.,]*$/, "Quantity must be a number"),
  unit: z.string().trim(),
  projectType: z.string().trim(),
  location: z.string().trim().max(120, "Location is too long"),
  date: z.string().trim(),
  notes: z.string().trim().max(1000, "Please keep details under 1000 characters"),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent";
const fieldError = "border-destructive focus:border-destructive";
const labelCls = "mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground";

export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormValues>({
    name: "",
    company: "",
    phone: "",
    email: "",
    category: "",
    product: defaultProduct ?? "",
    quantity: "",
    unit: "pieces",
    projectType: "",
    location: "",
    date: "",
    notes: "",
  });

  const products = useMemo(
    () => categories.find((c) => c.slug === form.category)?.products ?? [],
    [form.category],
  );

  const set =
    (k: keyof FormValues) =>
    (e: { target: { value: string } }) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [k]: value, ...(k === "category" ? { product: "" } : null) }));
      setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const message = `QUOTE REQUEST — ${site.name}
Name: ${form.name}
Company: ${form.company || "—"}
Phone: ${form.phone}
Email: ${form.email || "—"}
Product: ${form.product}
Quantity: ${form.quantity ? `${form.quantity} ${form.unit}` : "—"}
Project type: ${form.projectType || "—"}
Delivery location: ${form.location || "—"}
Required by: ${form.date || "—"}
Notes: ${form.notes || "—"}`;

  const validate = () => {
    const result = schema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FormValues;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    toast.error("Please check the highlighted fields.");
    return false;
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    track("quote_submit", {
      category: form.category,
      product: form.product,
      quantity: form.quantity || "unspecified",
      unit: form.unit,
      project_type: form.projectType || "unspecified",
      location: form.location || "unspecified",
      has_email: !!form.email,
    });
    toast.success("Quote request ready — choose how you'd like to send it.");
    window.open(whatsappLink(message), "_blank", "noopener");
  }

  const Err = ({ k }: { k: keyof FormValues }) =>
    errors[k] ? <p className="mt-1.5 text-xs font-medium text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="soft-card border border-hairline bg-card p-6 md:p-10">
      <p className="eyebrow">Request a quote</p>
      <h2 className="mt-3 font-display text-2xl tracking-tight">Tell us what you need</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Complete the form and we will respond with a written quotation. Fields marked * are required.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="q-name">Full name *</label>
          <input
            id="q-name"
            className={`${field} ${errors.name ? fieldError : ""}`}
            value={form.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
          />
          <Err k="name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-company">Company</label>
          <input id="q-company" className={field} value={form.company} onChange={set("company")} />
          <Err k="company" />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-phone">Phone *</label>
          <input
            id="q-phone"
            type="tel"
            inputMode="tel"
            placeholder="07XX XXX XXX"
            className={`${field} ${errors.phone ? fieldError : ""}`}
            value={form.phone}
            onChange={set("phone")}
            aria-invalid={!!errors.phone}
          />
          <Err k="phone" />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-email">Email</label>
          <input
            id="q-email"
            type="email"
            className={`${field} ${errors.email ? fieldError : ""}`}
            value={form.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
          />
          <Err k="email" />
        </div>

        <div>
          <label className={labelCls} htmlFor="q-category">Product family *</label>
          <select
            id="q-category"
            className={`${field} ${errors.category ? fieldError : ""}`}
            value={form.category}
            onChange={set("category")}
          >
            <option value="">Select a product family</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <Err k="category" />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-product">Product *</label>
          <select
            id="q-product"
            className={`${field} ${errors.product ? fieldError : ""}`}
            value={form.product}
            onChange={set("product")}
            disabled={!form.category}
          >
            <option value="">{form.category ? "Select a product" : "Choose a family first"}</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            {form.category && <option value="Multiple products / not sure">Multiple products / not sure</option>}
          </select>
          <Err k="product" />
        </div>

        <div>
          <label className={labelCls} htmlFor="q-qty">Quantity</label>
          <div className="flex gap-2">
            <input
              id="q-qty"
              inputMode="decimal"
              className={`${field} ${errors.quantity ? fieldError : ""}`}
              placeholder="e.g. 500"
              value={form.quantity}
              onChange={set("quantity")}
            />
            <select
              aria-label="Quantity unit"
              className={`${field} w-40`}
              value={form.unit}
              onChange={set("unit")}
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <Err k="quantity" />
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
          <Err k="location" />
        </div>
        <div>
          <label className={labelCls} htmlFor="q-date">Required by</label>
          <input id="q-date" type="date" className={field} value={form.date} onChange={set("date")} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="q-notes">Project details</label>
          <textarea id="q-notes" rows={4} className={field} value={form.notes} onChange={set("notes")} />
          <Err k="notes" />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-accent px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Send quote request
      </button>

      <div className="mt-8 border-t border-hairline pt-6">
        <p className="eyebrow">Prefer another channel? Send the same details via</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            onClick={validate}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <a
            href={emailLink(
              `Quotation request — ${form.product || "Precast concrete"}`,
              `${message}\n\nSent from midriftconcreteworks.com`,
            )}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="size-4" /> Email
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
          >
            <Phone className="size-4" /> {site.phone}
          </a>
        </div>
      </div>

      {sent && (
        <p className="mt-4 text-sm text-muted-foreground">
          Your request opened in WhatsApp so our sales team receives it instantly. You can also send the same details by
          email or call us directly.
        </p>
      )}
    </form>
  );
}
