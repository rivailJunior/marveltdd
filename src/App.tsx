import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Description from "./pages/description";
import { RequestProvider } from "./provider/requestContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarvelHeader } from "./components/header/marvelHeader";

function App(): JSX.Element {
    return (
        <Router>
            <RequestProvider>
                <MarvelHeader
                    leftLabel="Objective"
                    userName="Rivail  "
                    descriptionRight="Teste front-end"
                />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/description">
                        <Description />
                    </Route>
                    <Route path="/:id">
                        <Home />
                    </Route>
                </Switch>
            </RequestProvider>
        </Router>
    );
}

export default App;
