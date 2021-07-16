/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:17:08
 * @modify date 2021-07-15 13:17:13
 * @desc [description]
 */
import { useRouter } from "next/router";
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/global/TopNav";
import { Grid } from "semantic-ui-react";

/**
 * Single Sequence Information
 * @returns {JSX.Element} - Details of selected Sequence
 */
function Sequence() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <TopNav />
      <Grid padded>
        <Grid.Column>{slug}</Grid.Column>
      </Grid>
    </>
  );
}

export default withAuth(Sequence);
