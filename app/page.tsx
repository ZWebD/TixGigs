import Footer from "@/components/footer";
import ClientMyComponent from "@/components/events";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="w-full  flex flex-col text-center min-h-screen items-center justify-between p-24">
      <Intro />
      <ClientMyComponent />
      <Footer />
    </main>
  );
}
