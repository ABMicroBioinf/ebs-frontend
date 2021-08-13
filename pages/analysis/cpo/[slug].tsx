/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-09 08:40:30
 * @modify date 2021-08-09 08:40:30
 * @desc [description]
 */
import { useRouter } from "next/router";
import withAuth from "../../../middleware/withAuth";

import TopNav from "../../../components/global/TopNav";
import { Grid } from "semantic-ui-react";

function CPOSample(): JSX.Element {
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

export default withAuth(CPOSample);
