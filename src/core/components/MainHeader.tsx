import { Half2Icon } from "@radix-ui/react-icons";
import { Card, Flex } from "@radix-ui/themes";
import { Header } from "@radix-ui/themes/dist/cjs/components/table";
import { Link } from "react-router-dom";
import { UserHeaderOptions } from "../../user/components/UserHeaderOptions";
import { useAuthData } from "../../user/hooks/useAuthData";

const Logo = () => {
  const userId = useAuthData();

  return (
    <Flex align={"center"}>
      <Half2Icon color="green" />
      <Header><Link to={!userId ? '/' : '/user'}>TCG - React</Link></Header>
    </Flex>
  );
};

export const MainHeader = () => {
  return (
    <Card>
      <Flex align={"center"} justify={"between"}>
        <Logo />
        <UserHeaderOptions />
      </Flex>
    </Card>
  );
};
