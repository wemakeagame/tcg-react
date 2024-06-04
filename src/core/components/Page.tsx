

import { Container, Flex } from "@radix-ui/themes";
import { MainHeader } from "../../core/components/MainHeader";
import { Footer } from "../../core/components/Footer";
import { PropsWithChildren } from "react";

export const Page : React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Container size="3">
      <Flex direction={"column"}>
        <MainHeader />
            {children}
        <Footer />
      </Flex>
    </Container>
  );
};
