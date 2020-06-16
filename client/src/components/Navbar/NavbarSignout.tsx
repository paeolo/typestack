import { useRouter } from "next/router";
import { UserController } from "@openapi/.";

import { useTranslate } from "../../hooks";
import { Navbar } from "@components/Core";

export const NavbarSignout = () => {

  const router = useRouter();
  const { t } = useTranslate();

  const onClick = async () => {
    await UserController.logout();
    router.replace('/');
  }

  return (
    <Navbar.Item
      onClick={onClick}>
      {t('navbar.signout')}
    </Navbar.Item>
  );
}
