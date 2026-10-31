import Image from "next/image";
import { team, teamSection, type TeamMember } from "@/lib/content";
import { cardClass, cn } from "@/lib/utils";
import { LinkedInIcon } from "./icons";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

function Avatar({ member }: { member: TeamMember }) {
  return (
    <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-line bg-paper-2 sm:size-24">
      {member.photo ? (
        <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="96px" className="object-cover" />
      ) : (
        <span
          role="img"
          aria-label={`${member.name} avatar`}
          className="flex size-full items-center justify-center font-display text-2xl font-bold text-ink sm:text-3xl"
        >
          {member.initials}
        </span>
      )}
    </div>
  );
}

export function Team() {
  return (
    <Section id="team" tone="paper2">
      <SectionHeading id="team" {...teamSection} />

      <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {team.map((member, i) => (
          <li key={member.name}>
            <Reveal delay={i * 0.08} className="h-full">
              <article className={cn(cardClass, "flex h-full flex-col p-6 sm:p-8")}>
                <div className="flex items-center gap-5">
                  <Avatar member={member} />
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-orange-deep">{member.role}</p>
                  </div>
                </div>
                <p className="mt-6 flex-1 text-muted">{member.bio}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${member.name}'s skills`}>
                  {member.skills.map((skill) => (
                    <li key={skill} className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-ink/80">
                      {skill}
                    </li>
                  ))}
                </ul>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink/80 transition-colors hover:text-orange-deep"
                >
                  <LinkedInIcon className="size-5" />
                  <span>
                    LinkedIn<span className="sr-only"> profile of {member.name} (opens in a new tab)</span>
                  </span>
                </a>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
