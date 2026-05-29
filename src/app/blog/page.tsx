import { redirect } from "next/navigation";

export const metadata = {
  title: "Commentaries",
  description: "Reflective psychology, leadership, education, and wellness commentaries by Steve Muthusi, PhD."
};

export default function BlogPage() {
  redirect("/commentaries");
}
