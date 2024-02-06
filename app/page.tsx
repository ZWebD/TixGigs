import Footer from "@/components/footer";
import ClientMyComponent from "@/components/getData";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Intro />
      <ClientMyComponent />
      <Footer />
    </main>
  );
}
