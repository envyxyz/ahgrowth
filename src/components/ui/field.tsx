"use client";

import { useId } from "react";
import { easing, motion as designMotion } from "@/lib/design-tokens";

/**
 * `field` component token (inspirations.md Element 2): zero-box underline
 * input. No container, no card wrapper, just a baseline that draws in from
 * scaleX(0) on focus. One component covering text, email, tel, textarea and
 * select so the four never drift apart.
 */
type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  optionalSuffix?: string;
  /** Maps to the browser's saved-profile categories. */
  autoComplete?: string;
} & (
  | { as?: "input"; type?: "text" | "email" | "tel"; options?: never }
  | { as: "textarea"; type?: never; options?: never }
  | { as: "select"; type?: never; options: string[] }
);

const control =
  "type-body-md w-full rounded-none border-0 bg-transparent pb-sm pt-md text-ink outline-none placeholder:text-ink-faint focus:outline-none";

export function Field(props: FieldProps) {
  const { label, name, value, onChange, required, optionalSuffix, autoComplete } = props;
  const id = useId();

  /* Email and phone are identifiers, not prose: a spellcheck squiggle under a
     correctly typed address is noise. */
  const isIdentifier = props.as !== "textarea" && props.type !== "text";

  return (
    <div className="group relative">
      <label htmlFor={id} className="type-eyebrow text-ink-muted">
        {label}
        {!required && optionalSuffix ? (
          <span className="text-ink-faint"> {optionalSuffix}</span>
        ) : null}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`${control} resize-y`}
        />
      ) : props.as === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          /* The dropdown popup is painted by the OS, not by us. `color-scheme`
             on :root (tokens.css) is what makes it follow the active theme;
             a background utility here would only affect the closed control. */
          className={`${control} appearance-none`}
        >
          <option value="" />
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          required={required}
          value={value}
          autoComplete={autoComplete}
          inputMode={props.type === "email" ? "email" : props.type === "tel" ? "tel" : undefined}
          spellCheck={isIdentifier ? false : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={control}
        />
      )}

      {/* Resting baseline. */}
      <span aria-hidden className="block h-px w-full bg-hairline" />
      {/* Preset: Underline Draw. Scales in from the left on focus-within. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform group-focus-within:scale-x-100 motion-reduce:transition-none"
        style={{
          transitionDuration: `${designMotion.underlineDraw.durationMs}ms`,
          transitionTimingFunction: easing.outSoft,
        }}
      />
    </div>
  );
}
