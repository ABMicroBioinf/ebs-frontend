/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import _ from "lodash";
import { useEffect, useState } from "react";
import { Segment, Statistic, Icon, Popup } from "semantic-ui-react";
import { useEBSData } from "./EBSDataView";

function Count(props) {
  const { label, number, duration, icon, color, content } = props;

  const [count, setCount] = useState("0");

  useEffect(() => {
    let start = 0;
    const end = parseInt(number.substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [number, duration]);

  return (
    <Statistic>
      <Statistic.Value>
        <Popup
          inverted
          trigger={
            <div className="ebs-inline-wrapper">
              <Icon size="small" name={icon} color={color} />
              {count.toString()}
            </div>
          }
          content={content}
          position="bottom left"
        />
      </Statistic.Value>
      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  );
}

export function SequencesTotalCount() {
  const { rowData } = useEBSData();
  const { ORIGIN } = rowData;
  const statisticRef = ORIGIN.slice();

  const runs = statisticRef;
  const platforms = _.uniq(
    statisticRef.map((data) => data["experiment.platform"])
  );
  const organisms = _.uniq(statisticRef.map((data) => data["sample.organism"]));
  const instruments = _.uniq(
    statisticRef.map((data) => data["experiment.instrument"])
  );

  return (
    <Segment>
      <Statistic.Group widths="4">
        <Count
          label={"Total RUNs"}
          number={runs.length.toString()}
          content={"Too many data, Please refer to a table below"}
          duration={1}
          icon={"flask"}
          color={"orange"}
        />
        <Count
          label={"Total Platforms"}
          number={platforms.length.toString()}
          content={platforms.toString()}
          duration={1}
          icon={"cogs"}
          color={"yellow"}
        />
        <Count
          label={"Total Organisms"}
          number={organisms.length.toString()}
          content={organisms.toString()}
          duration={1}
          icon={"chain"}
          color={"green"}
        />
        <Count
          label={"Total Instruments"}
          number={instruments.length.toString()}
          content={instruments.toString()}
          duration={1}
          icon={"retweet"}
          color={"blue"}
        />
      </Statistic.Group>
    </Segment>
  );
}
