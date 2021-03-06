/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-07-15 13:19:59
 * @modify date 2021-07-15 13:20:05
 * @desc [description]
 */
import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import {
  Accordion,
  Menu,
  Label,
  Checkbox,
  Segment,
  Grid,
  Icon,
  Header,
  Dropdown,
  DropdownMenu,
  Button,
  Modal,
} from "semantic-ui-react";

import {
  API,
  API_ANNOTATION_METADATA,
  API_ASSEMBLY_METADATA,
  API_MLST_METADATA,
  API_RESISTOME_METADATA,
  API_SEQUENCE_METADATA,
  API_TB_SUMMARY_METADATA,
  API_VIRULOME_METADATA,
} from "../../../config/apis";
import { useAuth } from "../../../middleware/AuthProvider";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { JIYInteractiveSideMenuContext } from "../../../modules/JIYTable/core/models/JIYContexts";
import { DATE_FORMAT } from "../../../config/etc";

const ApiDict = [
  { tabName: "Sequence", endPoint: API_SEQUENCE_METADATA },
  { tabName: "Assembly", endPoint: API_ASSEMBLY_METADATA },
  { tabName: "Annotation", endPoint: API_ANNOTATION_METADATA },
  { tabName: "MLST", endPoint: API_MLST_METADATA },
  { tabName: "Resistome", endPoint: API_RESISTOME_METADATA },
  { tabName: "Virulome", endPoint: API_VIRULOME_METADATA },
  { tabName: "TBProfile", endPoint: API_TB_SUMMARY_METADATA },
];

/**
 * SideMenu
 * @param param - See {@link VizViewContext}
 * @returns - SideMenu Component
 */
function SideMenu({
  currentTab,
  query,
  wideView,
  setQuery,
  setWideView,
}: JIYInteractiveSideMenuContext): JSX.Element {
  const { accessToken } = useAuth();

  const [queryset, setQueryset] = useState([]);
  const [filters, setFilters] = useState(null);
  const [activeIndex, setActiveIndex] = useState({});
  const [currentRange, setNewRange] = useState([]);
  const [openDateSelector, setOpenDateSelector] = useState(false);
  const [currentDateSelector, setCurrentDateSelector] = useState(null);
  const [dateCreatedMin, setDateCreatedMin] = useState(null);
  const [dateCreatedMax, setDateCreatedMax] = useState(null);
  const [lastUpdateMin, setLastUpdateMin] = useState(null);
  const [lastUpdateMax, setLastUpdateMax] = useState(null);

  const handleClick = (e, data) => {
    const { index, active } = data;
    setActiveIndex({ ...activeIndex, [index]: !active });
  };

  const handleChange = useCallback(
    (e, data) => {
      const [key, value] = data.value.split(".");
      setQueryset(
        queryset.length > 0
          ? queryset.find((obj) => obj.field === key)
            ? queryset.map((obj) =>
                obj.field === key
                  ? {
                      ...obj,
                      keywords: obj.keywords.includes(value)
                        ? obj.keywords.filter(
                            (_, i) => i !== obj.keywords.indexOf(value)
                          )
                        : [...obj.keywords, value],
                    }
                  : { ...obj }
              )
            : [...queryset, { field: key, keywords: [value] }]
          : [{ field: key, keywords: [value] }]
      );
    },
    [queryset]
  );

  const handleDateChange = (event, data) => setNewRange(data.value);

  const handleDateSelector = useCallback((e, data) => {
    const col = Object.keys(data.value)[0].split("__")[0];
    setCurrentDateSelector(col);
    if (col === "DateCreated") {
      setDateCreatedMin(new Date(data.value[col + "__min"]));
      setDateCreatedMax(new Date(data.value[col + "__max"]));
    } else {
      setLastUpdateMin(new Date(data.value[col + "__min"]));
      setLastUpdateMax(new Date(data.value[col + "__max"]));
    }
    setOpenDateSelector(!openDateSelector);
  }, []);

  const getSubMenuItem = (parent, obj) => {
    const DATE_FIELDS = [
      "DateCreated__min",
      "DateCreated__max",
      "LastUpdate__min",
      "LastUpdate__max",
    ];

    if (Array.isArray(obj)) {
      return (
        <Grid className="ebs-filters-submenu">
          {obj.map((sub, index) => {
            // console.log(sub);
            // console.log(parent);
            // console.log(currentTab.toLowerCase() + "__" + parent);
            // const prefix =
            //   currentTab === "Sequence" ? "" : "assembly__sequence__";
            let prefix = "";
            if (parent === "project__id") {
              if (currentTab !== "Sequence") {
                if (currentTab === "Assembly") {
                  prefix = "sequence__";
                } else {
                  prefix = "assembly__sequence__";
                }
              }
            }
            return (
              <Grid.Row key={index}>
                <Grid.Column>
                  <Checkbox
                    label={sub[prefix + parent]}
                    name={sub[prefix + parent]}
                    value={prefix + parent + "." + sub[prefix + parent]}
                    onChange={handleChange}
                  />
                </Grid.Column>
                <Grid.Column width={2} floated="right">
                  <Label color="grey">{sub["total"]}</Label>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      );
    } else {
      if (DATE_FIELDS.includes(Object.keys(obj)[0])) {
        const col = Object.keys(obj)[0].split("__")[0];
        // setCurrentDateSelector(col);
        // if (col === "DateCreated") {
        //   setDateCreatedMin(obj[col + "__min"]);
        //   setDateCreatedMax(obj[col + "__max"]);
        // } else {
        //   setLastUpdateMin(obj[col + "__min"]);
        //   setLastUpdateMax(obj[col + "__max"]);
        // }
        return (
          <Grid className="ebs-filters-submenu">
            <Grid.Row>
              <Button.Group>
                <Button
                  className="ebs-button-in-left-pane"
                  onClick={handleDateSelector}
                  value={obj}
                >
                  {new Date(obj[col + "__min"]).toLocaleDateString(
                    "en-US",
                    DATE_FORMAT
                  )}
                </Button>
                <Button.Or text="to"></Button.Or>
                <Button
                  className="ebs-button-in-left-pane"
                  onClick={handleDateSelector}
                  value={obj}
                >
                  {new Date(obj[col + "__max"]).toLocaleDateString(
                    "en-US",
                    DATE_FORMAT
                  )}
                </Button>
              </Button.Group>
            </Grid.Row>
          </Grid>
        );
      } else {
        return null;
      }
    }
  };

  const getFilterMenu = () => {
    return Object.entries(filters).map(([key, value], index) => {
      return (
        <Menu.Item key={index}>
          <Accordion.Title
            active={activeIndex[index]}
            content={key}
            index={index}
            onClick={handleClick}
          />
          <Accordion.Content
            key={index}
            active={activeIndex[index]}
            content={getSubMenuItem(key, value)}
          />
        </Menu.Item>
      );
    });
  };

  const getFilterOn = () => {
    console.log(filters);
    return <Dropdown.Item text={"hello"} />;
  };

  const fetchFilters = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    const endPoint = ApiDict.find((d) => d.tabName === currentTab).endPoint;

    await axios
      // .get(API + API_SEQUENCE_METADATA + "?seqtype=" + module, config)
      .get(API + endPoint + "?seqtype=TB", config)
      .then((res) => {
        console.log(res.data);
        setFilters(res.data);
      })
      .catch((err) => {
        setFilters({ menu: [{ menu: "No filter data found", total: "N/A" }] });
        console.log(err);
      });
  }, [currentTab]);

  useEffect(() => {
    fetchFilters();
  }, [currentTab]);

  useEffect(() => {
    setQuery(
      queryset
        .filter((obj) => obj.keywords.length > 0)
        .map((obj) => obj.field + "=" + obj.keywords.join(","))
        .join("&")
    );
  }, [queryset]);

  return wideView ? (
    <Grid
      verticalAlign="middle"
      centered
      padded
      className="ebs-left-side-as-button-frame"
      onClick={() => {
        setWideView(!wideView);
      }}
    >
      <Grid.Row>
        <Grid.Column className="ebs-paddingless">
          <Icon name="angle double right" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <>
      <Segment className="ebs-borderless ebs-shadowless">
        <Header>{currentTab} Filters</Header>
      </Segment>
      {/* <Segment className="ebs-borderless ebs-shadowless">
        <Dropdown text="Filter on">
          <DropdownMenu>{getFilterOn()}</DropdownMenu>
        </Dropdown>
      </Segment> */}
      <div className="ebs-scrollable-inner">
        <Accordion className="ebs-borderless" fluid as={Menu} vertical>
          {filters && getFilterMenu()}
        </Accordion>
      </div>
      <Segment className="ebs-borderless ebs-shadowless">
        <Menu.Item
          onClick={() => {
            setWideView(!wideView);
          }}
        >
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>Wide View</Grid.Column>
              <Grid.Column textAlign="right">
                <Icon name="angle double left" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Menu.Item>
      </Segment>
      <Modal
        onClose={() => setOpenDateSelector(false)}
        onOpen={() => setOpenDateSelector(true)}
        open={openDateSelector}
        size="small"
      >
        <Modal.Header>Date Select</Modal.Header>
        <Modal.Content>
          <SemanticDatepicker
            inline={true}
            minDate={
              currentDateSelector === "DateCreated"
                ? dateCreatedMin
                : lastUpdateMin
            }
            maxDate={
              currentDateSelector === "DateCreated"
                ? dateCreatedMax
                : lastUpdateMax
            }
            showToday={false}
            onChange={handleDateChange}
            type="range"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setOpenDateSelector(false)}>
            Apply
          </Button>
          <Button color="red" onClick={() => setOpenDateSelector(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default SideMenu;
