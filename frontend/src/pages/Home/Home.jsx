import Recommended from "../Recommended";
import TopSeller from "../TopSeller";
import Banner from "./Banner";
import News from "./News";
const Home = () => {
  return (
    <div>
      <Banner />
      <TopSeller />
      <Recommended />
      <News />
    </div>
  );
};

export default Home;
