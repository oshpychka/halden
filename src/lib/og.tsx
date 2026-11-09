import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { palette } from "./palette";

export const ogSize = { width: 1200, height: 630 };

type OgProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  drawing: string;
  tall?: boolean;
};

async function font(file: string) {
  return readFile(join(process.cwd(), "public/fonts", file));
}

export async function ogImage({
  eyebrow,
  title,
  subtitle,
  drawing,
  tall,
}: OgProps) {
  const [bold, medium] = await Promise.all([
    font("plus-jakarta-sans-bold.ttf"),
    font("plus-jakarta-sans-medium.ttf"),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: palette.paper,
        padding: 56,
        fontFamily: "Jakarta",
        color: palette.ink,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          background: palette.surface,
          borderRadius: 32,
          boxShadow: "0 12px 40px rgba(31, 42, 46, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 660,
            padding: 44,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 5 }}>
            THE HALDEN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 24, color: palette.bay }}>
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: 700,
                letterSpacing: -1.5,
                fontSize: title.length > 40 ? 56 : 72,
                lineHeight: 1.02,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  color: palette.muted,
                  lineHeight: 1.35,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 36,
          }}
        >
          <img
            src={drawing}
            alt=""
            width={tall ? 280 : 400}
            height={tall ? 430 : 400}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: medium, weight: 500, style: "normal" },
        { name: "Jakarta", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
