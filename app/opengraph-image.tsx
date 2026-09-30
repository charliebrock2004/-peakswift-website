import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export const alt = `${site.legalName} — modern websites for businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Generated rather than hand-drawn so it can never drift out
 * of step with the tagline in lib/site.ts.
 */
export default async function OpengraphImage() {
  const mark = await readFile(
    join(process.cwd(), "public", "brand", "peakswift-mark.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0c15",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* brand glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(3,128,227,0.42), rgba(3,128,227,0) 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} alt="" width={78} height={55} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#eef1f8", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
              PeakSwift
            </span>
            <span style={{ color: "#6b7490", fontSize: 15, letterSpacing: 6 }}>
              STUDIOS
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#eef1f8",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Websites that make your business look the part.
          </span>
          <span style={{ color: "#9aa3bb", fontSize: 27, marginTop: 26, maxWidth: 820 }}>
            Modern, fast websites designed and built from scratch for businesses.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 3, background: "linear-gradient(90deg,#0ECEFB,#0380E3)", display: "flex" }} />
          <span style={{ color: "#6b7490", fontSize: 18, letterSpacing: 2 }}>
            {projects.map((project) => project.name).join("  ·  ").toUpperCase()}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
