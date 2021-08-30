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
} from "semantic-ui-react";

import { API, API_SEQUENCE_METADATA } from "../../../config/apis";
import { useAuth } from "../../../middleware/AuthProvider";
import { VizViewContext } from "../../../modules/JIYTable/core/models/JIYContexts";
import SemanticDatepicker from "react-semantic-ui-datepickers";

/**
 * SequencesSideMenu
 * @param param - See {@link EBSTableDashboardStateContext}
 * @returns - SideMenu Component
 */
function SequencesSideMenu({
  module,
  query,
  wideView,
  setQuery,
  setWideView,
}: VizViewContext): JSX.Element {
  const { accessToken } = useAuth();

  const [queryset, setQueryset] = useState([]);
  const [filters, setFilters] = useState(null);
  const [activeIndex, setActiveIndex] = useState({});
  const [currentRange, setNewRange] = useState([]);

  const handleClick = (e, data) => {
    const { index, active } = data;
    setActiveIndex({ ...activeIndex, [index]: !active });
  };

  const handleChange = useCallback(
    // {field: key, keywords: value}
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

  /**
   * Temporary
   * Need for Redesign the structure of response
   */
  const getSubMenuItem = (parent, obj) => {
    // Please consider redesign the structure of response
    // following is temporary
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
            // console.log(sub[parent]);
            return (
              <Grid.Row key={index}>
                <Grid.Column>
                  <Checkbox
                    label={sub[parent]}
                    name={sub[parent]}
                    value={parent + "." + sub[parent]}
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
        console.log(obj[col + "__min"]);
        console.log(obj[col + "__max"]);
        return (
          <Grid className="ebs-filters-submenu">
            <Grid.Row>
              <SemanticDatepicker
                inline={true}
                minDate={obj[col + "__min"]}
                maxDate={obj[col + "__max"]}
                showToday={false}
                onChange={handleDateChange}
                type="range"
              />
            </Grid.Row>
          </Grid>
        );
      } else {
        return null;
      }
    }
  };

  const getFilterMenu = () => {
    console.log(filters);
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

  const fetchFilters = useCallback(async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    await axios
      .get(API + API_SEQUENCE_METADATA + "?seqtype=" + module, config)
      .then((res) => {
        setFilters(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    // console.log(
    //   queryset
    //     .filter((obj) => obj.keywords.length > 0)
    //     .map((obj) => obj.field + "=" + obj.keywords.join(","))
    //     .join("&")
    // );
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
        <Header>{module} Filter</Header>
      </Segment>
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
    </>
  );
}

export default SequencesSideMenu;
