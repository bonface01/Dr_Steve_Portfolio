import Image from "next/image";
import type { ImageProps } from "next/image";

export function MaybeImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  if (!src) return null;

  const shouldUnoptimize = typeof src === "string" && src.startsWith("data:");

  return <Image src={src} alt={alt ?? ""} unoptimized={shouldUnoptimize} {...rest} />;
}
