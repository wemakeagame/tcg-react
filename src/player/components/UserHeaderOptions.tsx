import { PersonIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

export const UserHeaderOptions = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const requestLogout = () => {
    if (logout) {
      logout();
      navigate("/");
    }
  };

  return (
    <>
      {user ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              <PersonIcon />
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => requestLogout()}>
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : null}
    </>
  );
};
