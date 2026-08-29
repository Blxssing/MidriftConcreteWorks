import { UserRound } from "lucide-react";
import type { TeamMember } from "@/data/team";

/**
 * Reusable, editorial team card: photograph (or an elegant neutral placeholder),
 * name when verified, position and a short professional bio. No contact details.
 */
export function TeamCard({ member, featured = false }: { member: TeamMember; featured?: boolean }) {
  const heading = member.name ?? member.position;
  return (
    <article
      className={`soft-card group flex h-full flex-col overflow-hidden border border-hairline bg-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_28px_60px_-40px_rgba(0,0,0,0.55)] motion-reduce:transform-none motion-reduce:transition-none ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-concrete ${featured ? "md:w-1/2" : ""}`}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={`${member.name ?? member.position}, ${member.position} at Midrift Concrete Solutions`}
            loading="lazy"
            decoding="async"
            className="aspect-4/5 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none md:h-full"
          />
        ) : (
          <div className="flex aspect-4/3 w-full flex-col items-center justify-center gap-3 px-6 text-center md:h-full">
            <span className="flex size-14 items-center justify-center rounded-full border border-hairline bg-background text-accent">
              <UserRound className="size-6" aria-hidden="true" />
            </span>
            <span className="text-sm text-muted-foreground">Professional team photo coming soon</span>
          </div>
        )}
      </div>
      <div className={`flex flex-1 flex-col gap-3 p-6 md:p-8 ${featured ? "md:w-1/2 md:justify-center" : ""}`}>
        <h3 className="font-display text-xl tracking-tight">{heading}</h3>
        {member.name && (
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-accent">{member.position}</p>
        )}
        <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
      </div>
    </article>
  );
}
