import type { NextPage } from "next";
import Head from "next/head";

const BRAND = {
  bg: "#FBF8F2",
  ink: "#221D17",
  inkSoft: "rgba(34,29,23,0.62)",
  card: "#FFFFFF",
  line: "rgba(34,29,23,0.12)",
  peach: "#FFE4CD",
  red: "#D96B57",
};

const FONT_DISPLAY = "'Bebas Neue', Impact, sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://yousual.ng";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Yousual — Share links</title>
        <meta
          name="description"
          content="This is where Yousual invoice and receipt links open. Looking for a specific invoice? Ask the business that sent it for the full link."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        style={{
          background: BRAND.bg,
          minHeight: "100vh",
          fontFamily: FONT_BODY,
          color: BRAND.ink,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 420, width: "100%" }}>
          <div
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.line}`,
              borderRadius: 24,
              padding: "36px 28px",
              textAlign: "center",
            }}
          >
            {/* Torn-edge mark — a nod to a torn receipt, since this domain only ever exists to show one */}
            <svg
              width="64"
              height="28"
              viewBox="0 0 64 28"
              fill="none"
              style={{ margin: "0 auto 20px" }}
              aria-hidden="true"
            >
              <path
                d="M0 28 L0 10 L6 16 L12 8 L18 18 L24 6 L30 16 L36 4 L42 18 L48 8 L54 16 L60 6 L64 12 L64 28 Z"
                fill={BRAND.peach}
              />
            </svg>

            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: BRAND.inkSoft,
                marginBottom: 6,
              }}
            >
              No invoice found
            </div>

            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 30,
                letterSpacing: 0.5,
                marginBottom: 12,
              }}
            >
              This link needs an invoice
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: BRAND.inkSoft,
                marginBottom: 24,
              }}
            >
              Every link here points to one specific invoice or receipt. If you were sent a link
              and landed here instead, it may have been cut short when it was shared. Ask the
              business for the full link, or start your own records on Yousual.
            </p>

            <a
              href={APP_URL}
              style={{
                display: "inline-block",
                background: BRAND.ink,
                color: BRAND.bg,
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              Go to Yousual
            </a>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 14,
              color: BRAND.inkSoft,
              marginTop: 20,
            }}
          >
            Powered by Yousual
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;