// "use client";
import Header from "@/components/Header";
import SectionWrapper from "@/components/SectionWrapper";
import Dashboard from "@/components/Dashboard";

export default async function dashboard() {

  // you can also fetch all records at once via getFullList
  return (
    <>
      <Header />
      < SectionWrapper >
        <Dashboard />
      </SectionWrapper >
    </>

  );
}