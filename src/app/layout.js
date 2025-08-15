import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: {
//     template: "%s | Laptops Official",
//     default: "Laptops Official - Premium Gaming & Business Laptops",
//   },
//   description:
//     "Pakistan's premier destination for gaming laptops, business notebooks, and high-performance computers. Best prices, quality assured.",
//   keywords: [
//     "laptops",
//     "gaming laptops",
//     "business laptops",
//     "Pakistan",
//     "computers",
//   ],
//   authors: [{ name: "Laptops Official" }],
//   openGraph: {
//     title: "Laptops Official - Premium Gaming & Business Laptops",
//     description:
//       "Pakistan's premier destination for gaming laptops, business notebooks, and high-performance computers.",
//     type: "website",
//     locale: "en_US",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Laptops Official",
//     description:
//       "Pakistan's premier destination for gaming laptops, business notebooks, and high-performance computers.",
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
