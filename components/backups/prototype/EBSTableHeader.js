import _ from 'lodash'
import { useCallback, useEffect, useReducer } from "react";
import { Table } from "semantic-ui-react";


export default function EBSTableHeader(props) {

    const { columnData, rowData, setRowData } = props

    const {
        origin,
        filtered,
        page,
        pageSize,
    } = rowData

    const initialSortState = {
        column: null,
        data: filtered.length > 0 ? filtered : origin,
        direction: null,
    }

    const sortableReducer = useCallback((state, action) => {
        switch (action.type) {
            case 'CHANGE_SORT':
                if (state.column === action.column) {
                    return {
                        ...state,
                        data: state.data.slice().reverse(),
                        direction:
                            state.direction === 'ascending' ? 'descending' : 'ascending',
                    }
                }

                return {
                    column: action.column,
                    data: _.sortBy(state.data, [action.column]),
                    direction: 'ascending',
                }
            default:
                throw new Error()
        }
    }, [])

    const [sortState, dispatchSort] = useReducer(sortableReducer, initialSortState)
    const { column, data, direction } = sortState

    useEffect(() => {
        if (filtered.length > 0) {
            setRowData({
                ...rowData,
                type: 'SORT_DATA',
                filtered: data,
                paginated: data.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize),
            })
        } else {
            setRowData({
                ...rowData,
                type: 'SORT_DATA',
                origin: data,
                paginated: data.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize),
            })
        }
    }, [sortState])

    return (
        <Table.Header>
            <Table.Row>
                {columnData &&
                    columnData.map((title, index) =>
                        <Table.HeaderCell
                            sorted={column === title ? direction : null}
                            onClick={() => dispatchSort({ type: 'CHANGE_SORT', column: title })}
                            key={index}
                        >
                            {title}
                        </Table.HeaderCell>)
                }
            </Table.Row>
        </Table.Header>
    )

}