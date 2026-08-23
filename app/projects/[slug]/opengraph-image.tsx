import { ImageResponse } from "next/og";

import { getProjectBySlug, projects } from "@/content/projects";

type ProjectOgImageProps = {
  params: {
    slug: string;
  };
};

const accentColor = {
  blue: "#2458ff",
  purple: "#a855f7",
  yellow: "#f7ff00",
  green: "#38ff7a",
  red: "#ff4d4d"
} as const;

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export default function ProjectOpenGraphImage({ params }: ProjectOgImageProps) {
  const project = getProjectBySlug(params.slug) ?? projects[0];
  const accent = accentColor[project.accent];
  const metric = project.metrics[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#fff8e8",
          color: "#050505",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 54,
          width: "100%"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              background: accent,
              border: "6px solid #050505",
              color: project.accent === "purple" || project.accent === "blue" ? "#ffffff" : "#050505",
              fontSize: 30,
              fontWeight: 900,
              padding: "14px 18px"
            }}
          >
            CASE STUDY
          </div>
          <div
            style={{
              border: "6px solid #050505",
              fontSize: 24,
              fontWeight: 900,
              padding: "14px 18px"
            }}
          >
            {project.category.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: accent,
              fontSize: 86,
              fontWeight: 900,
              lineHeight: 0.95,
              maxWidth: 1000
            }}
          >
            {project.shortTitle.toUpperCase()}
          </div>
          <div
            style={{
              borderTop: "6px solid #050505",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.25,
              marginTop: 26,
              paddingTop: 22,
              width: 980
            }}
          >
            {project.summary}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              background: "#ffffff",
              border: "6px solid #050505",
              fontSize: 24,
              fontWeight: 900,
              padding: "14px 18px"
            }}
          >
            {metric ? `${metric.value} ${metric.label}` : "SOURCE-FAITHFUL CLAIMS"}
          </div>
          <div
            style={{
              background: "#f7ff00",
              border: "6px solid #050505",
              fontSize: 24,
              fontWeight: 900,
              padding: "14px 18px"
            }}
          >
            TANMAY BHUSKUTE
          </div>
        </div>
      </div>
    ),
    size
  );
}
