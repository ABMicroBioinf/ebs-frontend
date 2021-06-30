/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import axios from "axios";
import withAuth from "../../middleware/withAuth";
import EBSDatatable from "../../components/table/EBSDataTable";
import EBSFilters from "../../components/table/EBSFilters";
import { useAuth } from "../../middleware/AuthProvider";

import TopNav from "../../components/TopNav";
import {
  Dimmer,
  Loader,
  Grid,
  Segment,
  Statistic,
  Header,
  Icon,
  Placeholder,
} from "semantic-ui-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/**
 * Customize your table here
 * *********************************
 * *********************************
 * *********************************
 */
const PRIMARY_FIELD = "run_name";
const CUSTOM_FIELDS = [
  { name: "run_name", alias: "RUN", children: [] },
  {
    name: "sample",
    alias: null,
    children: [
      {
        name: "organism",
        alias: "Organism",
        children: [],
      },
    ],
  },
  {
    name: "experiment",
    alias: null,
    children: [
      {
        name: "instrument",
        alias: "Instrument",
        children: [],
      },
      {
        name: "platform",
        alias: "Platform",
        children: [],
      },
      {
        name: "libraryLayout",
        alias: "Library Layout",
        children: [],
      },
      {
        name: "librarySource",
        alias: "Library Source",
        children: [],
      },
    ],
  },
];
/**
 * *********************************
 * *********************************
 * *********************************
 * - END - Custom table setting
 */

/**
 * Helper functions
 * *********************************
 * *********************************
 * *********************************
 */
// expected return array of column objects
const getSchemeOrigin = (sample) => {
  let scheme = [];
  for (const [key, value] of Object.entries(sample)) {
    if (typeof value === "object" && value !== null && value !== undefined) {
      scheme.push({
        name: key,
        alias: null,
        children: getSchemeOrigin(value),
      });
    } else {
      scheme.push({ name: key, alias: null, children: [] });
    }
  }
  return scheme;
};

// expected returns True or false
const validateCustomFields = (schemeOrigin) => {
  const getFieldStructure = (obj) => {
    if (obj.children.length > 0) {
      return obj.children.map((child) => obj.name + "." + child.name);
    } else {
      return obj.name;
    }
  };
  try {
    return CUSTOM_FIELDS.flatMap(getFieldStructure).every((field) =>
      schemeOrigin.flatMap(getFieldStructure).includes(field)
    );
  } catch {
    throw Error("Invalid fields are selected");
  }
};

// expected returns flatten { cols1, cols2, cols3 ... }
const applyCutomFields = (dataset, scheme) => {
  const pick = (obj, scheme) => {
    return scheme
      .flatMap((field) => {
        if (field.name in obj) {
          if (field.children.length >= 1) {
            return pick(obj[field.name], field.children);
          } else {
            // return { [field.name]: obj[field.name] };
            return { [field.alias]: obj[field.name] };
          }
        } else {
          return {};
        }
      })
      .reduce((res, o) => Object.assign(res, o), {});
  };

  return dataset.map((data) => {
    return pick(data, scheme);
  });
};
/**
 * *********************************
 * *********************************
 * *********************************
 * - END - Helper functions
 */

// interface
const EBSDataContext = createContext({
  dataset: { headers: [], rows: [] },
  primary: 0,
});

export function useEBSData() {
  const context = useContext(EBSDataContext);
  if (context === undefined) {
    throw new Error("useEBSData must be used within an EBSDataProvider");
  }
  return context;
}

function Sequences() {
  const { accessToken } = useAuth();

  const [dataset, setDataset] = useState(null);
  const [primary, setPrimary] = useState(0);

  const fetchData = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    await axios
      .get("http://localhost:8000/api/seq/run", config)
      .then((res) => {
        // IMPORTANT
        //
        // Since the backend doesn't resturn dataset with scheme,
        // we assume that every data fields are ALWAYS consistent.
        // If the above assumption is possible,
        // we can use a scheme of the first data row to represent the rest of data scheme
        if (validateCustomFields(getSchemeOrigin(res.data[0]))) {
          const raw = applyCutomFields(res.data, CUSTOM_FIELDS);
          const formatted = { headers: Object.keys(raw[0]), rows: raw };
          setDataset(formatted);
          setPrimary(Object.keys(raw[0]).indexOf(PRIMARY_FIELD));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <EBSDataContext.Provider
      value={{
        dataset,
        primary,
        setDataset,
        setPrimary,
      }}
    >
      <TopNav />
      <div className="ebs-side-section-left">
        <div className="ebs-scrollable-inner">
          {dataset ? (
            <EBSFilters data={dataset} />
          ) : (
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          )}
        </div>
      </div>
      <div className="ebs-section-main">
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header size="large">Statistic</Header>
              <Segment>
                <Statistic.Group widths="4">
                  <Statistic color="orange">
                    <Statistic.Value>
                      <Icon size="small" name="flask" />
                      83
                    </Statistic.Value>
                    <Statistic.Label>Total RUNs</Statistic.Label>
                  </Statistic>
                  <Statistic color="yellow">
                    <Statistic.Value>
                      <Icon size="small" name="cogs" />1
                    </Statistic.Value>
                    <Statistic.Label>Total Platforms</Statistic.Label>
                  </Statistic>
                  <Statistic color="green">
                    <Statistic.Value>
                      <Icon size="small" name="chain" />5
                    </Statistic.Value>
                    <Statistic.Label>Total Organisms</Statistic.Label>
                  </Statistic>
                  <Statistic color="blue">
                    <Statistic.Value>
                      <Icon size="small" name="retweet" />1
                    </Statistic.Value>
                    <Statistic.Label>Total Instruments</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {dataset ? (
                <EBSDatatable data={dataset} primary={primary} />
              ) : (
                <>
                  <Placeholder fluid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Grid>
                      <Grid.Column textAlign="center">
                        <Header icon>
                          <Icon name="table" />
                        </Header>
                      </Grid.Column>
                    </Grid>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </EBSDataContext.Provider>
  );
}

export default withAuth(Sequences);
