// src/app/layout.tsx
import { ReduxProvider } from '@/store/providers';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Agregamos suppressHydrationWarning aquí
    <html lang="es" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </MantineProvider>
      </body>
    </html>
  );
}