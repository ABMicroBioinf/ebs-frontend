import { Table } from "semantic-ui-react";

export default function EBSCellRow({ row }) {

    return (
        <Table.Row>
            {row.Isolate && <Table.Cell>{row.Isolate}</Table.Cell>}
            {row.Reads && <Table.Cell>{row.Reads}</Table.Cell>}
            {row.Yield && <Table.Cell>{row.Yield}</Table.Cell>}
            {row.GeeCee && <Table.Cell>{row.GeeCee}</Table.Cell>}
            {row.MinLen && <Table.Cell>{row.MinLen}</Table.Cell>}
            {row.AvgLen && <Table.Cell>{row.AvgLen}</Table.Cell>}
            {row.MaxLen && <Table.Cell>{row.MaxLen}</Table.Cell>}
            {row.ModeLen && <Table.Cell>{row.ModeLen}</Table.Cell>}
            {row.Phred && <Table.Cell>{row.Phred}</Table.Cell>}
            {row.AvgQual && <Table.Cell>{row.AvgQual}</Table.Cell>}
            {row.Depth && <Table.Cell>{row.Depth}</Table.Cell>}
            {row.Quality && <Table.Cell>{row.Quality}</Table.Cell>}
        </Table.Row>
    )

}