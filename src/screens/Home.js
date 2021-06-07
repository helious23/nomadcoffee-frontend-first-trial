import { useHistory } from "react-router";
import { logUserOut } from "../apollo";
const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Log out</button>
    </div>
  );
};

export default Home;
