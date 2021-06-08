/**
 * Author: Jongil Yoon
 */

import { Table } from "semantic-ui-react";


export default function EBSCellRow({ row }) {

    return (
        <Table.Row>
            {row &&
                Object.values(row)
                    .map((value, index) => <Table.Cell key={index}>{value}</Table.Cell>)
            }
        </Table.Row>
    )

}