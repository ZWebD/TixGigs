import Footer from "@/components/footer";
import ClientMyComponent from "@/components/events";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="container mx-auto w-full lx:max-w-[65%] flex flex-col text-center min-h-screen items-center justify-between px-24">
      <Intro />
      <ClientMyComponent />
      <Footer />
    </main>
  );
}
