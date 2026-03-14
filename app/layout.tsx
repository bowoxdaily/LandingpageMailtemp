import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Sora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TempMailKit - Source Code Email Temporary",
  description:
    "Jual dan tampilkan source code layanan email temporary dengan landing page modern yang fokus konversi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '906324075559956');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script id="meta-pixel-buy-click" strategy="afterInteractive">
          {`
            document.addEventListener('click', function (event) {
              var target = event.target;
              if (!target) return;

              var buyButton = target.closest('[data-track-buy="true"]');
              if (!buyButton || typeof fbq !== 'function') return;

              fbq('track', 'InitiateCheckout', {
                content_name: 'Source Code Email Temporary',
                value: 100000,
                currency: 'IDR'
              });

              fbq('trackCustom', 'BuyButtonClick', {
                button_text: (buyButton.textContent || '').trim(),
                destination_url: buyButton.getAttribute('href') || '',
                page_path: window.location.pathname
              });
            });
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=906324075559956&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
