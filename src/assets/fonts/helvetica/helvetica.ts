import localFont from "next/font/local";

export const helvetica = localFont({
  preload: true,
  src: [
    {
      path: "./helvetica-roman.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./helvetica-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./helvetica-bold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});
