import "@/app/globals.css";
import Providers from "@/app/provider";
import Header from "@/app/roles/customer_system/components/Header";

export const metadata = {
  title: "Specto",
  description: "puchase Your favourite products",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
        <Header/>
        {children}
    </Providers>
  );
}
