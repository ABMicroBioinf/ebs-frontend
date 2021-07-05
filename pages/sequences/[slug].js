/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import { useRouter } from "next/router";
import withAuth from "../../middleware/withAuth";

import TopNav from "../../components/TopNav";
import { Grid } from "semantic-ui-react";

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
