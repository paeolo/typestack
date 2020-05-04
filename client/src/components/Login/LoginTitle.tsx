import React from "react";

import { useInjection } from "../../hooks";
import { UserStore } from "../../stores";
import { StoresBindings } from "../../contexts";
import { useObserver } from "mobx-react-lite";

export const LoginTitle = () => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);

  return useObserver(() =>
    <React.Fragment>
      <h1 className="title has-text-centered">
        Bonjour {userStore.isLogin
          ? `${userStore.currentUser.profile.lastName} ${userStore.currentUser.profile.firstName}!`
          : 'visiteur'
        }
      </h1>
      <h2 className="subtitle has-text-centered">
        #
      </h2>
    </React.Fragment>
  );
}
