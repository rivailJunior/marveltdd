import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Description from "./pages/description";
import { RequestProvider } from "./provider/requestContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarvelHeader } from "./components/marvelHeader";

function App(): JSX.Element {
    return (
        <Router>
            <RequestProvider>
                <MarvelHeader
                    leftLabel="Objective"
                    userName="Rivail"
                    descriptionRight="Teste front-end"
                />
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/description">
                    <Description />
                </Route>
            </RequestProvider>
        </Router>
    );
}

export default App;
