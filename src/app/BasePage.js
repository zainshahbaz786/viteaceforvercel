import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";

import { DashboardPage } from "./pages/DashboardPage";




const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);


const ErrorsPage = lazy(() =>
  import("./modules/ErrorsExamples/ErrorsPage")
);

// const UsersPage = lazy(() => import("./modules/manageusers/userspage"));





const KeywordsPage = lazy(() =>
  import("./modules/managekeywords/keywordspage")
);
const CustomerPage = lazy(() =>
  import("./modules/managecustomers/customerpage")
);

const TransPage = lazy(() =>
  import("./modules/manageTransactions/transpage")
);
// for
const SalesPage = lazy(() => import("./modules/managesales/salespage"));

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        {/* <Route path="/user-profile" component={UserProfilepage} /> */}
        {/* <ContentRoute path="/" component={DashboardPage} /> */}
        <ContentRoute path="/commodities" component={KeywordsPage} />
        <ContentRoute path="/sales" component={SalesPage} />
        <ContentRoute path="/customers" component={CustomerPage} />

        <ContentRoute path="/transactions" component={TransPage} />
        <ContentRoute  component={ErrorsPage} />
       

        

        
        
        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
