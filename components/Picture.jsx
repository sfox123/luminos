'use client';

// Shows a real photo when `src` is given, otherwise the built-in illustration.
export default function Picture({ src, alt = '', children, className = '', caption }) {
  return (
    <figure className={`picture ${className}`}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
