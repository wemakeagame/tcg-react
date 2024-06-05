import { Half2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Card, Flex } from "@radix-ui/themes";
import { Header } from "@radix-ui/themes/dist/cjs/components/table";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Flex align={"center"}>
      <Half2Icon color="green" />
      <Header><Link to={'/'}>TCG - React</Link></Header>
    </Flex>
  );
};

export const MainHeader = () => {
  return (
    <Card>
      <Flex align={"center"} justify={"between"}>
        <Logo />
        <PersonIcon/>
      </Flex>
    </Card>
  );
};
