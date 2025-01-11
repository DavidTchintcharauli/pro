// "use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/global.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { getDictionary } from "./dictionaries";
import { LocaleProvider } from "../components/providers/LanguageContext";

export const metadata = {
  title: "Core Fitness",
  description: "Your Fitness Friend",
};

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang);
  const dictHeader = dict.header;
  const dictChat = dict.chatWindow;

  return (
    <html lang="en">
      <LocaleProvider dictChat={dictChat}>
        <UserProvider>
          <body className="bg-neutral-200 dark:bg-neutral-900">
            <Header dict={dictHeader}></Header>
            {children}
            <Footer></Footer>
          </body>
        </UserProvider>
      </LocaleProvider>
    </html>
  );
}
