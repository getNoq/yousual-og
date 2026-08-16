import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

const BRAND = {
  bg: "#FBF8F2",
  ink: "#221D17",
  inkSoft: "rgba(34,29,23,0.62)",
  card: "#FFFFFF",
  line: "rgba(34,29,23,0.12)",
  peach: "#FFE4CD",
  mint: "#DBF3E7",
  green: "#2E8F63",
  red: "#D96B57",
  amber: "#FDECC8",
  amberStrong: "#B7791F",
};

const FONT_DISPLAY = "'Bebas Neue', Impact, sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://thetobiallen.pythonanywhere.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://yousual.ng";

interface ShareItem {
  description: string;
  qty: number;
  unitPrice: number;
}

interface ShareData {
  businessName: string;
  customerName: string;
  invoiceNumber: string;
  items: ShareItem[];
  total: number;
  status: "paid" | "due" | "partially_paid";
  amountPaid: number;
  amountDue: number;
  createdAt: string;
  paidDate: string | null;
  note: string;
  brandColor: string;
}

interface PageProps {
  share: ShareData | null;
  shareId: string;
}

const docLabel = (status: string) => (status === "paid" ? "Receipt" : "Invoice");
// const formatNaira = (n: number) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

const formatNaira = (n: number, currency: "symbol" | "code" = "symbol"): string => {
  const amount = Number(n || 0).toLocaleString("en-NG");
  return currency === "code" ? `NGN ${amount}` : `₦${amount}`;
};

const Page: NextPage<PageProps> = ({ share, shareId }) => {
  const pageUrl = `${APP_URL}/i/${shareId}`;
  const accentColor = share?.brandColor || BRAND.ink;

  const ogTitle = share
    ? `${docLabel(share.status)} from ${share.businessName} — ${formatNaira(share.total)}`
    : "Yousual — Invoices & receipts for small businesses";
  const ogDescription = share
    ? `${docLabel(share.status)} ${share.invoiceNumber} for ${share.customerName}. ${
        share.status === "paid"
          ? "Paid in full."
          : share.status === "partially_paid"
          ? `${formatNaira(share.amountDue)} outstanding.`
          : "Payment outstanding."
      }`
    : "This invoice link doesn't exist or has expired.";

  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Yousual" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${APP_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={`${APP_URL}/og-image.png`} />
      </Head>

      <div style={{ background: BRAND.bg, minHeight: "100vh", fontFamily: FONT_BODY, color: BRAND.ink }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>
          {!share ? (
            <p style={{ textAlign: "center", fontSize: 14, color: BRAND.inkSoft }}>
              This invoice link doesn&apos;t exist or has expired.
            </p>
          ) : (
            <div style={{ background: BRAND.card, border: `1px solid ${BRAND.line}`, borderRadius: 24, padding: 28 }}>
              <div style={{ textAlign: "center", borderBottom: `1px solid ${BRAND.line}`, paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: BRAND.inkSoft, marginBottom: 4 }}>
                  {docLabel(share.status)} · {share.invoiceNumber}
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 32, letterSpacing: 0.5, color: accentColor }}>
                  {share.businessName}
                </div>
                <div style={{ fontSize: 12, color: BRAND.inkSoft, marginTop: 4 }}>
                  {share.status === "paid" ? `Paid ${share.paidDate || share.createdAt}` : `Issued ${share.createdAt}`}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 16, color: BRAND.inkSoft }}>
                <span>Customer</span>
                <span style={{ color: BRAND.ink, fontWeight: 600 }}>{share.customerName}</span>
              </div>

              <div style={{ marginBottom: 16 }}>
                {share.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                    <span>{item.qty} × {item.description}</span>
                    <span>{formatNaira(item.qty * item.unitPrice)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${BRAND.line}`, paddingTop: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: 32, letterSpacing: 0.5, color: accentColor }}>
                  {formatNaira(share.total, "code")}
                </span>
              </div>

              <div style={{ textAlign: "center", marginTop: 16 }}>
                {share.status === "paid" && (
                  <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: BRAND.mint, color: BRAND.green }}>PAID</span>
                )}
                {share.status === "partially_paid" && (
                  <>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: BRAND.amber, color: BRAND.amberStrong }}>PARTIALLY PAID</span>
                    <div style={{ fontSize: 13, color: BRAND.inkSoft, marginTop: 16, marginBottom: 16 }}>
                      {formatNaira(share.amountPaid)} paid · {formatNaira(share.amountDue)} outstanding
                    </div>
                  </>
                )}
                {share.status === "due" && (
                  <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: BRAND.peach, color: BRAND.red }}>OUTSTANDING</span>
                )}
              </div>

              {share.note && (
                <div style={{ borderBottom: `1px solid ${BRAND.line}`, paddingBottom: 24 }}>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: "#374151" }}>Note:</div>
                    <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.5, color: BRAND.inkSoft, whiteSpace: "pre-wrap" }}>{share.note}</div>
                </div>
              )}

             <p style={{ textAlign: "center", fontSize: 14, color: BRAND.inkSoft, marginTop: 24 }}>Powered by Yousual</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const shareId = context.params?.id as string;

  try {
    const res = await fetch(`${API_BASE}/api/invoices/share/${shareId}/`);
    if (!res.ok) return { props: { share: null, shareId } };
    const share = (await res.json()) as ShareData;
    return { props: { share, shareId } };
  } catch {
    return { props: { share: null, shareId } };
  }
};

export default Page;