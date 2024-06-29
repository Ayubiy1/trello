import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import ListsComp from "./components/lists";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path=":id" element={<ListsComp />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
