import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type Props = {
  /** "dark" = for light backgrounds (original colors); "light" = for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
};

// Logo PNG is 1679 × 620 (aspect ≈ 2.708)
export default function Logo({ variant = "dark", className = "h-10", priority }: Props) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex shrink-0 items-center">
      <Image
        src={variant === "light" ? "/brand/logo-light.png" : "/brand/logo.png"}
        alt={`${site.name} logo`}
        width={1679}
        height={620}
        priority={priority}
        className={`w-auto ${className}`}
        sizes="200px"
      />
    </Link>
  );
}
