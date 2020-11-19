import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ConfigPage from "./pages/config/ConfigPage";
import { TodoPage } from "./pages/TodoPage";
import AboutPage from "./pages/about/AboutPage";
import PageLayout from "./layouts/PageLayout";

export const routes: RouteConfig[] = [
    {
        path: "/home",
        exact: true,
        component: () : any => <HomePage />,
    },
    {
        path: "/config",
        exact: true,
        component: () : any => <ConfigPage />,
    },
    {
        path: "/todo",
        component: () : any => <TodoPage />,
    },
    {
        path: "/about",
        component: () : any => <AboutPage />,
    },
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout} />
    </Switch>
);
