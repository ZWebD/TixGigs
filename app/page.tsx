import UpcomingEvents from "@/components/fetch2";
import Footer from "@/components/footer";
import ClientMyComponent from "@/components/getData";
import UpcomingEventsList from "@/components/header";
// import MyComponent from "@/components/header";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Intro />
      {/* <UpcomingEvents /> */}
      {/* <UpcomingEventsList /> */}
      <ClientMyComponent />
      <Footer />
    </main>
  );
}
