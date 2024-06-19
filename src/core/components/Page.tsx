import { Container, Flex } from "@radix-ui/themes";
import { MainHeader } from "../../core/components/MainHeader";
import { Footer } from "../../core/components/Footer";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container size="4" style={{ paddingTop: "15px" }}>
      <ToastContainer  autoClose={1000}/>
      <Flex direction={"column"}>
        <MainHeader />
        {children}
      </Flex>
      <Footer />
    </Container>
  );
};
