import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { QuoteDialog } from "./QuoteDialog";
import { track } from "@/lib/analytics";

type OpenOptions = { product?: string | undefined; sourcePage?: string | undefined };

const QuoteContext = createContext<{ openQuote: (o?: OpenOptions) => void }>({ openQuote: () => {} });

/** Single, centralized lead-capture flow for every sales CTA on the site. */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean } & OpenOptions>({ open: false });

  const openQuote = useCallback((o: OpenOptions = {}) => {
    const sourcePage = o.sourcePage ?? (typeof window !== "undefined" ? window.location.pathname : "unknown");
    track("quote_cta_clicked", { source_page: sourcePage, product: o.product ?? "none" });
    setState({ open: true, product: o.product, sourcePage });
  }, []);

  const value = useMemo(() => ({ openQuote }), [openQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDialog
        open={state.open}
        product={state.product}
        sourcePage={state.sourcePage}
        onClose={() => setState({ open: false })}
      />
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
