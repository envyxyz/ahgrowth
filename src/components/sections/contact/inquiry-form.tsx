"use client";

import { useState } from "react";
import { content } from "@/content";
import { Chip } from "@/components/ui/chip";
import { Field } from "@/components/ui/field";
import { CursorFillButton } from "@/components/ui/cursor-fill-button";

/**
 * 02 — Project Inquiry Form (inspirations.md Element 2): pill-chip
 * multi-select for services, pill-chip single-select for budget, then
 * zero-box underline fields.
 *
 * Static site, no backend. Submitting composes a mailto: draft with
 * everything filled in. That is honest about what actually happens, needs no
 * infrastructure, and never shows a fake success screen. Swapping in a real
 * endpoint means replacing `handleSubmit` and nothing else.
 */
export function InquiryForm() {
  const { form } = content.contact;
  const { fields } = form;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    designation: "",
    phone: "",
    referralSource: "",
    projectDetails: "",
  });

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const toggleService = (id: string) =>
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceTitles = content.services
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.title)
      .join(", ");

    const body = [
      `${fields.name}: ${values.name}`,
      `${fields.email}: ${values.email}`,
      `${fields.company}: ${values.company}`,
      `${fields.designation}: ${values.designation}`,
      `${fields.phone}: ${values.phone}`,
      `${form.servicesLabel}: ${serviceTitles}`,
      `${form.budgetLabel}: ${budget}`,
      `${fields.referralSource}: ${values.referralSource}`,
      "",
      `${fields.projectDetails}:`,
      values.projectDetails,
    ].join("\n");

    const subject = form.mailtoSubject.replace("{name}", values.name);
    window.location.href = `mailto:${content.footer.directEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4xl">
      <fieldset className="flex flex-col gap-lg border-0 p-0">
        <legend className="type-eyebrow text-ink-muted">{form.servicesLabel}</legend>
        <div className="flex flex-wrap gap-sm">
          {content.services.map((service) => (
            <Chip
              key={service.id}
              role="checkbox"
              label={service.title}
              selected={selectedServices.includes(service.id)}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-lg border-0 p-0">
        <legend className="type-eyebrow text-ink-muted">{form.budgetLabel}</legend>
        <div className="flex flex-wrap gap-sm">
          {form.budgetTiers.map((tier) => (
            <Chip
              key={tier}
              role="radio"
              label={tier}
              selected={budget === tier}
              onToggle={() => setBudget(budget === tier ? "" : tier)}
            />
          ))}
        </div>
      </fieldset>

      <div className="grid gap-xxl md:grid-cols-2">
        <Field
          label={fields.name}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          required
        />
        <Field
          label={fields.email}
          name="email"
          autoComplete="email"
          type="email"
          value={values.email}
          onChange={set("email")}
          required
        />
        <Field
          label={fields.company}
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={set("company")}
          optionalSuffix={form.optionalSuffix}
        />
        <Field
          label={fields.designation}
          name="designation"
          autoComplete="organization-title"
          value={values.designation}
          onChange={set("designation")}
          optionalSuffix={form.optionalSuffix}
        />
        <Field
          label={fields.phone}
          name="phone"
          autoComplete="tel"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          optionalSuffix={form.optionalSuffix}
        />
        <Field
          as="select"
          label={fields.referralSource}
          name="referralSource"
          options={form.referralOptions}
          value={values.referralSource}
          onChange={set("referralSource")}
          optionalSuffix={form.optionalSuffix}
        />
        <div className="md:col-span-2">
          <Field
            as="textarea"
            label={fields.projectDetails}
            name="projectDetails"
            value={values.projectDetails}
            onChange={set("projectDetails")}
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-lg">
        <CursorFillButton label={form.submitLabel} type="submit" />
        <p className="type-caption max-w-[36ch] text-ink-faint">{form.fallbackNote}</p>
      </div>
    </form>
  );
}
