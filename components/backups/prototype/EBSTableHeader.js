import { Table } from "semantic-ui-react";

export default function EBSTableHeader({ columnData }) {

    return (
        <Table.Header>
            <Table.Row>
                {columnData && columnData.map((column, index) => <Table.HeaderCell key={index}>{column}</Table.HeaderCell>)}
            </Table.Row>
        </Table.Header>
    )

}