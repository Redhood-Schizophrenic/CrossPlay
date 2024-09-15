import Header from "@/components/Header";
import Session from "@/components/Session";
import SectionWrapper from "@/components/SectionWrapper";

export default async function Index() {

  // you can also fetch all records at once via getFullList
  return (
    <SectionWrapper>
      <Header />
      <Session />
    </SectionWrapper>
  );
}
