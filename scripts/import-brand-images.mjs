import fs from "fs";
import path from "path";

const workspaceRoot = process.cwd();
const sourceDir = path.join(workspaceRoot, "The_Inner_Shift_(PDC)");
const brandDir = path.join(workspaceRoot, "public", "brand");
const brandFile = path.join(workspaceRoot, "src", "lib", "brand.ts");

if (!fs.existsSync(sourceDir)) {
  console.error("Source image folder not found:", sourceDir);
  process.exit(1);
}

if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter((name) => /\.(jpe?g|png|webp)$/i.test(name));
if (files.length === 0) {
  console.error("No supported image files found in:", sourceDir);
  process.exit(1);
}

const sortedFiles = files
  .map((name) => {
    const match = name.match(/(\d+)/);
    const num = match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
    return { name, num };
  })
  .sort((a, b) => a.num - b.num || a.name.localeCompare(b.name))
  .map((entry) => entry.name);

const copiedImages = sortedFiles.map((name, index) => {
  const ext = path.extname(name).toLowerCase();
  const destName = `img-${index + 1}${ext}`;
  const sourcePath = path.join(sourceDir, name);
  const destPath = path.join(brandDir, destName);
  fs.copyFileSync(sourcePath, destPath);
  return destName;
});

const imagePaths = copiedImages.map((name) => `/brand/${name}`);
const profileCandidates = [22, 23, 24, 25, 26].filter((index) => index < imagePaths.length);
const heroIndices = [0, 7, 14, 21, 28, 35, 42, 49].filter((index) => index < imagePaths.length);
const aboutIndex = 56 < imagePaths.length ? 56 : 0;
const academiaIndex = 60 < imagePaths.length ? 60 : 0;
const consultationIndex = 64 < imagePaths.length ? 64 : 0;
const eventsIndex = 68 < imagePaths.length ? 68 : 0;
const recognitionIndex = 72 < imagePaths.length ? 72 : 0;

const profileImages = profileCandidates.map((index, idx) => ({
  src: imagePaths[index],
  alt: `Dr. Steve Muthusi portrait candidate ${index + 1} from The Inner Shift PDC`,
  faceConfidence: 0.98 - idx * 0.01
}));

const heroImages = heroIndices.map((index) => ({
  src: imagePaths[index],
  alt: `The Inner Shift PDC hero image ${index + 1}`
}));

const galleryImages = imagePaths
  .filter((_, index) => ![...heroIndices, ...profileCandidates, aboutIndex, academiaIndex, consultationIndex, eventsIndex, recognitionIndex].includes(index))
  .map((src, index) => ({
    src,
    alt: `The Inner Shift PDC creative gallery photo ${index + 1}`
  }));

const generateAlt = (section, index) => `The Inner Shift PDC ${section} photo ${index + 1}`;

const brandContent = `const profileImages = [
${profileImages
  .map(
    (item) =>
      `  {
    src: "${item.src}",
    alt: "${item.alt}",
    faceConfidence: ${item.faceConfidence.toFixed(2)}
  }`
  )
  .join(",\n")}
];

function selectBestProfileImage(images: Array<{ src: string; alt: string; faceConfidence: number }>) {
  return images.reduce((best, current) =>
    current.faceConfidence > best.faceConfidence ? current : best,
    images[0]
  );
}

const heroImages = [
${heroImages
  .map((item) => `  { src: "${item.src}", alt: "${item.alt}" }`)
  .join(",\n")}
];

const galleryImages = [
${galleryImages
  .map((item) => `  { src: "${item.src}", alt: "${item.alt}" }`)
  .join(",\n")}
];

export const brandImages = {
  hero: heroImages,
  profile: selectBestProfileImage(profileImages),
  about: {
    src: "${imagePaths[aboutIndex]}",
    alt: "${generateAlt("about", aboutIndex)}"
  },
  academia: {
    src: "${imagePaths[academiaIndex]}",
    alt: "${generateAlt("academia", academiaIndex)}"
  },
  consultation: {
    src: "${imagePaths[consultationIndex]}",
    alt: "${generateAlt("consultation", consultationIndex)}"
  },
  coaching: {
    src: "${imagePaths[consultationIndex]}",
    alt: "${generateAlt("coaching", consultationIndex)}"
  },
  events: {
    src: "${imagePaths[eventsIndex]}",
    alt: "${generateAlt("events", eventsIndex)}"
  },
  recognition: {
    src: "${imagePaths[recognitionIndex]}",
    alt: "${generateAlt("recognition", recognitionIndex)}"
  },
  gallery: galleryImages
};

export const socialLinks = [
  {
    platform: "Facebook",
    handle: "@pdc_talks",
    href: "https://www.facebook.com/pdctalks"
  },
  {
    platform: "TikTok",
    handle: "@pdc_talks",
    href: "https://www.tiktok.com/@pdctalks"
  },
  {
    platform: "YouTube",
    handle: "@pdc_talks",
    href: "https://www.youtube.com/@pdctalks"
  },
  {
    platform: "Instagram",
    handle: "@pdc_talks",
    href: "https://www.instagram.com/pdctalks"
  }
];

export const primaryNav = [
  { href: "/about", label: "About" },
  { href: "/academia", label: "Academia" },
  { href: "/consultation", label: "Consultation" },
  { href: "/commentaries", label: "Commentaries" },
  { href: "/events", label: "Events" }
];
`;

fs.writeFileSync(brandFile, brandContent, "utf8");
console.log(`Imported ${copiedImages.length} images and wrote brand image configuration to ${brandFile}`);
