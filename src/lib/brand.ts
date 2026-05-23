const profileImages = [
  {
    src: "/brand/about-portrait.jpg",
    alt: "Dr. Steve Muthusi portrait from The Inner Shift PDC event",
    faceConfidence: 0.98
  }
];

function selectBestProfileImage(images: Array<{ src: string; alt: string; faceConfidence: number }>) {
  return images.reduce((best, current) =>
    current.faceConfidence > best.faceConfidence ? current : best,
    images[0]
  );
}

export const brandImages = {
  hero: [
    {
      src: "/brand/hero-speaking-wide.jpg",
      alt: "Steve Muthusi speaking at a The Inner Shift PDC leadership gathering"
    },
    {
      src: "/brand/hero-audience-wide.jpg",
      alt: "Participants listening during a psychology and leadership session at The Inner Shift PDC"
    },
    {
      src: "/brand/hero-dialogue-wide.jpg",
      alt: "PDC dialogue session with audience engagement during The Inner Shift"
    },
    {
      src: "/brand/hero-stage-wide.jpg",
      alt: "Facilitator at the podium during a The Inner Shift PDC event"
    }
  ],
  profile: selectBestProfileImage(profileImages),
  about: {
    src: "/brand/about-portrait.jpg",
    alt: "Dr. Steve Muthusi portrait from The Inner Shift PDC event"
  },
  academia: {
    src: "/brand/academia-audience.jpg",
    alt: "Audience members reflecting during an academic-style session at The Inner Shift PDC"
  },
  consultation: {
    src: "/brand/consultation-mentorship.jpg",
    alt: "Mentorship conversation and leadership engagement at The Inner Shift PDC"
  },
  coaching: {
    src: "/brand/consultation-coaching.jpg",
      alt: "Coaching demonstration at a The Inner Shift PDC session"
  },
  events: {
    src: "/brand/events-group.jpg",
    alt: "Group photo from The Inner Shift PDC event"
  },
  recognition: {
    src: "/brand/events-recognition.jpg",
    alt: "Recognition moment during a The Inner Shift PDC engagement"
  },
  gallery: [
    {
      src: "/brand/gallery-reflection.jpg",
      alt: "Recognition and reflection during a The Inner Shift PDC event"
    },
    {
      src: "/brand/gallery-speaking.jpg",
      alt: "Speaker addressing participants during The Inner Shift PDC"
    },
    {
      src: "/brand/events-recognition.jpg",
      alt: "Participant recognition moment at The Inner Shift PDC"
    },
    {
      src: "/brand/consultation-coaching.jpg",
      alt: "Mentorship and coaching moment during The Inner Shift PDC"
    }
  ]
};

export const socialLinks = [
  {
    platform: "Facebook",
    handle: "@pdc_talks",
    href: "https://www.facebook.com/pdc_talks"
  },
  {
    platform: "TikTok",
    handle: "@pdc_talks",
    href: "https://www.tiktok.com/@pdc_talks"
  },
  {
    platform: "YouTube",
    handle: "@pdc_talks",
    href: "https://www.youtube.com/@pdc_talks"
  },
  {
    platform: "Instagram",
    handle: "@pdc_talks",
    href: "https://www.instagram.com/pdc_talks"
  }
];

export const primaryNav = [
  { href: "/about", label: "About" },
  { href: "/academia", label: "Academia" },
  { href: "/consultation", label: "Consultation" },
  { href: "/commentaries", label: "Commentaries" },
  { href: "/events", label: "Events" }
];
