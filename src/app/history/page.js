// "use client";
import Header from "@/components/Header";
import SectionWrapper from "@/components/SectionWrapper";
import History from "@/components/History";

export default async function history() {

  // you can also fetch all records at once via getFullList
  return (
    < SectionWrapper >
      <Header />
      <History />
    </SectionWrapper >
  );
}
