import { useWeb3React } from "@web3-react/core";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

import Modal from "./patterns/modal";

import { useEagerConnect } from "./utils/hooks";

const AppOriginal = () => {
  const [isWrongNetwork, setIsWrongNetwork] = useState();

  useEagerConnect();
  const { chainId, active } = useWeb3React();
  const context = useWeb3React();

  useEffect(() => {
    console.log('CONTEXTO:: ',context);
    console.log(chainId);
    if (active) {
      if (chainId !== 41113) {
        console.error("Wrong ChainID");
        setIsWrongNetwork(true);
      } else {
        setIsWrongNetwork(false);
      }
    }
  }, [chainId]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
          {isWrongNetwork && (
            <Modal
              variant="wrongNetwork"
              title="Wrong network"
              description="You are on wrong network. Please connect to BSC Mainnet to continue"
              buttonText="Connect now"
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppOriginal;
