import {
  Geist,
  Geist_Mono,
  Montserrat_Alternates,
  Roboto,
} from "next/font/google";

export const geistSans = Geist({
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const defaultFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
