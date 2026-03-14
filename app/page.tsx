import Image from "next/image";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const featureCards = [
  {
    title: "Generator Email",
    description: "Buat alamat email sementara secara otomatis.",
    icon: "EG",
  },
  {
    title: "Viewer Inbox",
    description: "Lihat email masuk secara real-time.",
    icon: "IV",
  },
  {
    title: "Multi Domain",
    description: "Mendukung banyak domain email.",
    icon: "MD",
  },
  {
    title: "Hapus Otomatis",
    description: "Email otomatis dihapus setelah masa aktif habis.",
    icon: "AD",
  },
  {
    title: "Panel Admin",
    description: "Kelola domain dan pesan inbox dengan mudah.",
    icon: "AP",
  },
];

const faqItems = [
  {
    question: "Ini script SaaS atau source code",
    answer:
      "Ini adalah source code penuh, bukan akun SaaS hosted. Kamu deploy dan punya kontrol penuh di server sendiri.",
  },
  {
    question: "Berapa lama proses instalasi",
    answer:
      "Sebagian besar developer bisa menyelesaikan setup dalam 30-90 menit, tergantung konfigurasi hosting/VPS dan domain.",
  },
  {
    question: "Apakah bisa dijalankan di hosting atau VPS saya",
    answer:
      "Bisa. Sistem ini dirancang untuk deployment di hosting maupun VPS dengan setup PHP dan database standar.",
  },
  {
    question: "Apakah source code bisa dimodifikasi",
    answer:
      "Bisa. Kamu mendapatkan akses penuh source code untuk kustomisasi fitur, UI, dan logic bisnis.",
  },
];

const demoScreenshotPlaceholders = [
  {
    title: "Screenshot 1",
    expectedFile: "screenshot-1.jpg",
  },
  {
    title: "Screenshot 2",
    expectedFile: "screenshot-2.jpg",
  },
  {
    title: "Screenshot 3",
    expectedFile: "screenshot-3.jpg",
  },
  {
    title: "Screenshot 4",
    expectedFile: "screenshot-4.jpg",
  },
];

type VariantKey = "a" | "b";

const metaAdsVariants: Record<
  VariantKey,
  {
    navCta: string;
    heroBadge: string;
    heroTitle: string;
    heroDescription: string;
    heroNote: string;
    trustPoints: string[];
    offerBar: string;
    primaryCta: string;
    secondaryCta: string;
    pricingLead: string;
    finalTitle: string;
    finalDescription: string;
    finalPrimaryCta: string;
  }
> = {
  a: {
    navCta: "Beli Source Code",
    heroBadge: "Siap diluncurkan",
    heroTitle: "Jual Source Code Layanan Email Temporary.",
    heroDescription:
      "Bangun layanan temp mail milikmu sendiri dengan source code siap deploy ini. Sudah termasuk generator email, viewer inbox, dan panel admin.",
    heroNote:
      "Produk ini berupa source code lengkap dengan dokumentasi dan panduan deployment. Kamu bisa host sendiri di hosting atau VPS milikmu.",
    trustPoints: [
      "Akses instan setelah pembayaran",
      "Dokumentasi setup lengkap",
      "Cocok untuk deployment di hosting atau VPS",
    ],
    offerBar:
      "Dirancang untuk traffic iklan: penawaran jelas, alur setup cepat, dan section yang fokus meningkatkan konversi.",
    primaryCta: "Beli Source Code",
    secondaryCta: "Lihat Demo",
    pricingLead: "Harga source code flat Rp100.000.",
    finalTitle: "Mulai Layanan Email Temporary Milikmu Hari Ini",
    finalDescription:
      "Dapatkan source code lengkap dan deploy platform temp mail milikmu dalam hitungan menit.",
    finalPrimaryCta: "Beli Source Code Sekarang",
  },
  b: {
    navCta: "Ambil Source Code",
    heroBadge: "Promo terbatas",
    heroTitle: "Punya Bisnis Temp Mail Sendiri Mulai Hari Ini.",
    heroDescription:
      "Tidak perlu bangun dari nol. Gunakan source code temp mail siap deploy untuk langsung launching, testing, dan monetisasi lebih cepat.",
    heroNote:
      "Kamu dapat source code penuh + dokumentasi praktis. Tinggal deploy ke hosting atau VPS dan mulai jalankan layananmu.",
    trustPoints: [
      "Akses file langsung setelah pembayaran",
      "Panduan instalasi langkah demi langkah",
      "Siap dipakai untuk proyek komersial",
    ],
    offerBar:
      "Cocok untuk iklan Meta Ads: pesan singkat, offer jelas, dan CTA kuat untuk mendorong pembelian cepat.",
    primaryCta: "Ambil Source Code Sekarang",
    secondaryCta: "Lihat Demo Live",
    pricingLead: "Harga source code flat Rp100.000, tanpa paket bertingkat.",
    finalTitle: "Jangan Tunda, Launch Temp Mail Versimu Sekarang",
    finalDescription:
      "Amankan source code lengkap hari ini, deploy di hosting atau VPS, lalu mulai bangun aset digital yang kamu miliki penuh.",
    finalPrimaryCta: "Ambil Source Code Hari Ini",
  },
};

type HomeProps = {
  searchParams?: {
    v?: string | string[];
  };
};

const orderLink = "https://lynk.id/bowo-store/2o2988817g3o";

const demoImagePattern = /\.(png|jpe?g|webp|avif)$/i;

export default function Home({ searchParams }: HomeProps) {
  const requestedVariant = Array.isArray(searchParams?.v)
    ? searchParams?.v[0]
    : searchParams?.v;
  const variant: VariantKey = requestedVariant === "b" ? "b" : "a";
  const copy = metaAdsVariants[variant];

  const demoFolder = join(process.cwd(), "public", "demo");
  const availableDemoFiles = existsSync(demoFolder)
    ? readdirSync(demoFolder)
        .filter((file) => demoImagePattern.test(file))
        .map((file) => {
          const filePath = join(demoFolder, file);
          return {
            file,
            version: Math.floor(statSync(filePath).mtimeMs),
            modifiedAt: statSync(filePath).mtimeMs,
          };
        })
        .sort((a, b) => b.modifiedAt - a.modifiedAt)
    : [];

  const demoScreenshots = demoScreenshotPlaceholders.map((item, index) => {
    const file = availableDemoFiles[index];

    return {
      ...item,
      src: file ? `/demo/${file.file}?v=${file.version}` : "",
    };
  });

  return (
    <div className="bg-[radial-gradient(circle_at_top,#e0f2fe_0%,#f8fafc_35%,#f8fafc_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/demo/logo.png"
              alt=""
              width={280}
              height={84}
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
            />
            <span className="text-lg font-bold tracking-tight sm:text-xl">TempMailKit</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#home" className="transition hover:text-cyan-600">
              Beranda
            </a>
            <a href="#features" className="transition hover:text-cyan-600">
              Fitur
            </a>
            <a href="#demo" className="transition hover:text-cyan-600">
              Demo
            </a>
            <a href="#pricing" className="transition hover:text-cyan-600">
              Harga
            </a>
            <a href="#faq" className="transition hover:text-cyan-600">
              FAQ
            </a>
          </nav>

          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            data-track-buy="true"
            className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
          >
            {copy.navCta}
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden border-b border-slate-200">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-300/35 via-sky-200/25 to-blue-300/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-44 top-24 hidden h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-200/20 blur-3xl lg:block" />

          <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <p className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-700">
                  {copy.heroBadge}
                </p>
                <p className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
                  Untuk developer
                </p>
              </div>
              <h1 className="text-balance text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {copy.heroDescription}
              </p>
              <p className="mt-4 max-w-2xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                {copy.heroNote}
              </p>

              <ul className="mt-8 grid gap-3 text-slate-700 sm:grid-cols-2">
                {[
                  "Akses source code penuh",
                  "Siap deploy di hosting atau VPS",
                  "Sistem inbox real-time",
                  "Mendukung banyak domain email",
                  "Panel admin siap pakai",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-900"
                >
                  {copy.secondaryCta}
                </a>
                <a
                  href={orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-buy="true"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
                >
                  {copy.primaryCta}
                </a>
              </div>

              <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
                {copy.trustPoints.map((trust) => (
                  <p
                    key={trust}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm"
                  >
                    {trust}
                  </p>
                ))}
              </div>
            </div>

              <div className="hidden lg:block">
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-cyan-100/60">
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[2rem] bg-gradient-to-bl from-cyan-100 to-transparent" />
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <p className="ml-2 text-xs font-semibold text-slate-500">
                      tempmailkit-dashboard
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Inbox Real-time
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {["verifikasi@platform.id", "noreply@ads-meta.com", "kode@signup.app"].map((mail) => (
                        <div
                          key={mail}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
                        >
                          {mail}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                        Domain Aktif
                      </p>
                      <p className="mt-2 text-2xl font-black text-slate-900">12</p>
                    </div>
                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                        Email Masuk
                      </p>
                      <p className="mt-2 text-2xl font-black text-slate-900">7.8K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-5 pt-10 sm:px-8 lg:px-10">
          <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-sky-50 px-6 py-4 text-center text-sm font-medium text-cyan-900 shadow-sm lg:py-5 lg:text-base">
            {copy.offerBar}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="rounded-3xl border border-rose-100 bg-rose-50/50 p-8 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Masalah</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Banyak developer menemui hambatan teknis saat membangun platform
              email temporary dari nol.
            </p>
            <ul className="mt-8 grid gap-4 text-slate-700 md:grid-cols-2">
              {[
                "Membangun sistem penerimaan email itu kompleks",
                "Konfigurasi mail server cukup sulit",
                "Inbox real-time butuh sistem tambahan",
                "Rotasi domain dan pengelolaan email memakan waktu",
              ].map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border border-rose-100 bg-white px-5 py-4"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Solusi</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Source code ini sudah menyediakan sistem inti temp mail agar kamu
              bisa launching lebih cepat dengan risiko teknis lebih kecil.
            </p>
            <ul className="mt-8 grid gap-4 text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Generator email otomatis",
                "Viewer inbox real-time",
                "Dukungan banyak domain",
                "Sistem hapus email otomatis",
                "Panel admin untuk monitoring",
              ].map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border border-white/70 bg-white px-5 py-4"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Fitur</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Semua yang kamu butuhkan untuk menjalankan dan mengembangkan
              layanan email temporary.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-100"
              >
                <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 opacity-0 transition group-hover:opacity-100" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white">
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Frontend menggunakan Next.js.",
                "Styling menggunakan Tailwind CSS.",
                "Backend menggunakan PHP.",
                "Database MySQL atau PostgreSQL.",
                "Deploy di hosting atau VPS Linux.",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <h2 className="text-3xl font-bold tracking-tight">Cara Kerja</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Beli source code.",
              "Deploy ke hosting atau VPS kamu.",
              "Konfigurasikan domain dan mail server.",
              "Luncurkan layanan temp mail milikmu.",
            ].map((step, index) => (
              <article
                key={step}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <p className="text-sm font-semibold text-cyan-600">
                  Langkah {index + 1}
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-slate-900">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Harga</h2>
            <p className="mt-3 text-slate-600">{copy.pricingLead}</p>
          </div>

          <article className="mx-auto max-w-3xl rounded-3xl border border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 shadow-2xl shadow-cyan-200/60 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="inline-flex rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-700">
                  Harga Flat
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl">Source Code</h3>
                <p className="mt-3 text-4xl font-black tracking-tight lg:text-5xl">Rp100.000</p>
                <ul className="mt-6 space-y-3 text-slate-700">
                  {[
                    "Source code lengkap",
                    "Panduan instalasi",
                    "Dokumentasi penggunaan",
                    "Lisensi penggunaan",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                data-track-buy="true"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-600 px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
              >
                Beli Source Code Sekarang
              </a>
            </div>
          </article>
        </section>

        <section id="demo" className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Demo</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Coba pengalaman sistemnya terlebih dulu sebelum membeli.
            </p>

            <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-12">
              {demoScreenshots.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:col-span-6"
                >
                  {item.src ? (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <a href={`#preview-${index}`} className="block">
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={1280}
                          height={720}
                          className="aspect-[16/10] w-full object-cover transition hover:scale-[1.01] lg:aspect-[16/9]"
                        />
                      </a>
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white lg:aspect-[16/9]">
                      <p className="text-sm font-semibold text-slate-500">
                        {item.title}
                      </p>
                    </div>
                  )}
                  <p className="mt-3 text-sm font-medium text-slate-700">{item.title}</p>

                  {item.src ? (
                    <div
                      id={`preview-${index}`}
                      className="fixed inset-0 z-[90] hidden items-center justify-center bg-slate-950/80 p-4 target:flex"
                    >
                      <a
                        href="#demo"
                        className="absolute inset-0"
                        aria-label="Tutup preview"
                      />
                      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-3">
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={1600}
                          height={900}
                          className="h-auto w-full rounded-xl object-contain"
                        />
                        <div className="mt-3 flex items-center justify-between px-1 text-sm text-slate-200">
                          <p>{item.title}</p>
                          <a
                            href="#demo"
                            className="rounded-full border border-slate-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-slate-300"
                          >
                            Tutup
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                data-track-buy="true"
                className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500"
              >
                Beli Sekarang
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-[1200px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-20">
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-8 grid gap-4">
            {faqItems.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white px-6 py-5"
              >
                <h3 className="text-lg font-semibold">{faq.question}?</h3>
                <p className="mt-2 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-900 text-white">
          <div className="mx-auto w-full max-w-[1200px] px-5 py-16 text-center sm:px-8 lg:px-10 lg:py-20">
            <h2 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">
              {copy.finalTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              {copy.finalDescription}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                data-track-buy="true"
                className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-400"
              >
                {copy.finalPrimaryCta}
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-md md:hidden">
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            data-track-buy="true"
            className="inline-flex w-full items-center justify-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-300/50 transition hover:bg-cyan-500"
          >
            {copy.primaryCta}
          </a>
        </div>
      </main>
    </div>
  );
}
