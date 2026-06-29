/**
 * Shariah-compliant insurance provider catalog for Indonesia.
 *
 * Used by insuranceService.coverageSummary to recommend only providers
 * that pass Dewan Syariah Nasional (DSN-MUI) standards — no riba, no gharar,
 * no maysir, no unitlink.
 *
 * Coverage types: life, health, critical_illness, disability, auto, property
 * Akad types: tabarru (mutual help/donation), tijarah (commercial/profit-share),
 *             mixed (combination of both — common in shariah life insurance).
 */

export type ShariahAkadType = "tabarru" | "tijarah" | "mixed";

export type ShariahProductType = "life" | "health" | "critical_illness" | "disability" | "auto" | "property" | "education" | "savings";

export type ShariahProvider = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  akadDefault: ShariahAkadType;
  products: Array<{
    type: ShariahProductType;
    productName: string;
    description: string;
    minCoverageIdr: number;
    indicativePremiumIdr: number; // monthly estimate, age 31, healthy
    ageMin: number;
    ageMax: number;
    notes?: string;
  }>;
  dsnApproved: boolean;
  website: string;
};

export const shariahProviders: ShariahProvider[] = [
  {
    id: "takaful_keluarga",
    name: "Takaful Keluarga",
    shortName: "Takaful",
    description:
      "100% murni syariah, premium kompetitif (~30% lebih murah dari konvensional). Cocok untuk starter dan komunitas muslim.",
    akadDefault: "tabarru",
    dsnApproved: true,
    website: "https://www.takaful.co.id",
    products: [
      {
        type: "life",
        productName: "KlikPa+",
        description: "Term life online, beli via app. Akad tabarru murni, no investasi.",
        minCoverageIdr: 100_000_000,
        indicativePremiumIdr: 350_000,
        ageMin: 18,
        ageMax: 60,
        notes: "Bisa dibeli online, paling cepat apply-nya. Suitable untuk proteksi dasar keluarga muda.",
      },
      {
        type: "education",
        productName: "Takaful Dana Pendidikan",
        description: "Saving + protection untuk dana pendidikan anak. Akad tijarah + tabarru.",
        minCoverageIdr: 50_000_000,
        indicativePremiumIdr: 400_000,
        ageMin: 18,
        ageMax: 50,
      },
    ],
  },
  {
    id: "prudential_syariah",
    name: "Prudential Syariah",
    shortName: "Prudential",
    description:
      "Provider besar dengan produk syariah lengkap. Network klaim rumah sakit luas (termasuk RS Swasta premium). Ada agent dedicated untuk konsultasi.",
    akadDefault: "mixed",
    dsnApproved: true,
    website: "https://www.prudentialsyariah.co.id",
    products: [
      {
        type: "health",
        productName: "PRUprime Healthcare Syariah",
        description: "Health cash plan, cashless di 1000+ RS rekanan. Akad tijarah (premi kontribusi) + tabarru (dana klaim bersama).",
        minCoverageIdr: 200_000_000,
        indicativePremiumIdr: 450_000,
        ageMin: 18,
        ageMax: 65,
        notes: "Paling comprehensive untuk health. Coverage naik per tahun sampai plan limit.",
      },
      {
        type: "life",
        productName: "PRUlife Cover Syariah",
        description: "Term life murni (no cash value). Akad tabarru untuk proteksi jiwa.",
        minCoverageIdr: 500_000_000,
        indicativePremiumIdr: 600_000,
        ageMin: 18,
        ageMax: 60,
        notes: "Coverage 1-2M, premi flat 5-10 tahun (renewable).",
      },
      {
        type: "critical_illness",
        productName: "PRUCritical Benefit Syariah",
        description: "Cover 50+ kondisi kritis (kanker, stroke, heart attack). Akad tabarru murni.",
        minCoverageIdr: 500_000_000,
        indicativePremiumIdr: 280_000,
        ageMin: 18,
        ageMax: 55,
      },
    ],
  },
  {
    id: "allianz_syariah",
    name: "Allianz Life Syariah Indonesia",
    shortName: "Allianz",
    description:
      "Brand global, klaim cepat, produk sederhana & transparan. Cocok untuk yang mau straightforward term life + health.",
    akadDefault: "mixed",
    dsnApproved: true,
    website: "https://www.allianz.co.id/syariah",
    products: [
      {
        type: "life",
        productName: "Allianz LifeSyariah Fixed Benefit",
        description: "Term life murni dengan benefit tetap. Akad tabarru (dana kebajikan) + wakaf.",
        minCoverageIdr: 500_000_000,
        indicativePremiumIdr: 550_000,
        ageMin: 18,
        ageMax: 60,
      },
      {
        type: "health",
        productName: "Allianz LifeSyariah Hospital & Surgical",
        description: "Health plan, akad tijarah murni. Cashless di Allianz network.",
        minCoverageIdr: 100_000_000,
        indicativePremiumIdr: 380_000,
        ageMin: 18,
        ageMax: 65,
      },
    ],
  },
  {
    id: "manulife_syariah",
    name: "Manulife Syariah Indonesia",
    shortName: "Manulife",
    description:
      "Dewan Syariah kuat, produk savings + protection balanced. MiSmart Premier Berkah untuk bagi hasil (bukan guaranteed interest).",
    akadDefault: "mixed",
    dsnApproved: true,
    website: "https://www.manulife.co.id/id/syariah",
    products: [
      {
        type: "life",
        productName: "MiBestBener Syariah",
        description: "Term life murni. Akad tabarru, no investasi.",
        minCoverageIdr: 500_000_000,
        indicativePremiumIdr: 500_000,
        ageMin: 18,
        ageMax: 60,
      },
      {
        type: "savings",
        productName: "MiSmart Premier Berkah",
        description: "Saving plan dengan BAGI HASIL (bunga bank ≠ bagi hasil). Akad mudharabah.",
        minCoverageIdr: 50_000_000,
        indicativePremiumIdr: 600_000,
        ageMin: 18,
        ageMax: 55,
        notes: "Return berupa nisbah bagi hasil, bukan guaranteed rate. Patuh syariah.",
      },
    ],
  },
  {
    id: "bni_life_syariah",
    name: "BNI Life Insurance Syariah",
    shortName: "BNI Life",
    description: "BUMN-affiliated, sering bundled dengan produk BNI. Network klaim kuat di kota besar.",
    akadDefault: "mixed",
    dsnApproved: true,
    website: "https://www.bni-life.co.id",
    products: [
      {
        type: "life",
        productName: "BNI Life Solusi Proteksi Syariah",
        description: "Term life + critical illness combo.",
        minCoverageIdr: 300_000_000,
        indicativePremiumIdr: 400_000,
        ageMin: 18,
        ageMax: 60,
      },
    ],
  },
  {
    id: "bri_life_syariah",
    name: "BRI Life Insurance Syariah",
    shortName: "BRI Life",
    description: "BUMN-affiliated, produk terjangkau. Cocok untuk entry-level shariah insurance.",
    akadDefault: "mixed",
    dsnApproved: true,
    website: "https://www.bri-life.co.id",
    products: [
      {
        type: "life",
        productName: "BRI Life Simas Pro Syariah",
        description: "Term life + kecelakaan. Premi affordable.",
        minCoverageIdr: 200_000_000,
        indicativePremiumIdr: 280_000,
        ageMin: 18,
        ageMax: 55,
      },
    ],
  },
];

/** Lookup by id. */
export const shariahProviderById = new Map(
  shariahProviders.map((p) => [p.id, p])
);

/** Filter providers that offer a specific product type. */
export function findShariahProvidersByType(
  type: ShariahProductType
): ShariahProvider[] {
  return shariahProviders.filter((p) =>
    p.products.some((prod) => prod.type === type)
  );
}

/** Recommend the best provider for a product type, ranked by indicative premium (cheapest first). */
export function recommendShariahProvider(
  type: ShariahProductType
): { provider: ShariahProvider; product: ShariahProvider["products"][number] } | null {
  const candidates = findShariahProvidersByType(type);
  if (candidates.length === 0) return null;
  const products = candidates.flatMap((provider) =>
    provider.products
      .filter((p) => p.type === type)
      .map((product) => ({ provider, product }))
  );
  products.sort((a, b) => a.product.indicativePremiumIdr - b.product.indicativePremiumIdr);
  return products[0] ?? null;
}
