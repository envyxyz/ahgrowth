import type { ElementType } from "react";
import { PLACEHOLDER } from "@/content";

/**
 * Flags a field that's still `content.PLACEHOLDER` instead of rendering it
 * as if it were real copy — see CLAUDE.md "never invent plausible-sounding
 * content." Renders nothing but a dashed marker when the value is a
 * placeholder; renders the real value untouched otherwise.
 */
export function Copy({ value, as: Tag = "span" }: { value: string; as?: ElementType }) {
  if (value === PLACEHOLDER) {
    return (
      <Tag className="type-caption inline-block rounded-sm border border-dashed border-hairline px-sm py-xxs text-ink-faint">
        [PLACEHOLDER — content pending]
      </Tag>
    );
  }
  return <Tag>{value}</Tag>;
}
