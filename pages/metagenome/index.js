/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import withAuth from "../../middleware/withAuth";
import TopNav from "../../components/TopNav";

function Metagenome() {
  return (
    <>
      <TopNav />
      <br />
      <br />
      <div>Metagenome Main</div>
    </>
  );
}

export default withAuth(Metagenome);
