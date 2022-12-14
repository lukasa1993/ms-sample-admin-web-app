import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl }
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sample Admin Web App MS",
  viewport: "width=device-width,initial-scale=1"
});

export default function App() {
  return (
    <html lang="en" className="h-full">
    <head>
      <title></title>
      <link rel="icon" type="image/x-icon" sizes="48x48" href="/favicon.ico"/>
      <Meta />
      <Links />
    </head>
    <body className="h-full">
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}
