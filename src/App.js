import { Provider } from "react-redux";
import myStore from "./components/content/myStore";
import RoutePath from "./components/RoutePath";

function App() {
  return (
    <Provider store={myStore}>
      <div className="wrapper">
        <RoutePath />
        <div className="overly"></div>
      </div>
    </Provider>
  );
}

export default App;