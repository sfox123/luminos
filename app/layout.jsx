import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/figtree/400.css';
import '@fontsource/figtree/500.css';
import '@fontsource/figtree/600.css';
import './globals.css';

export const metadata = {
  title: 'Luminos | We illuminate the path from raw data to real results',
  description:
    'Luminos builds dashboards, data pipelines, analytics, machine learning models and AI systems for businesses.',
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
