// app/layout.tsx
"use client";
import { LensProvider, LensConfig, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <LensProvider config={lensConfig}>
        </LensProvider>
    </html>
  );
}