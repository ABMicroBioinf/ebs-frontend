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
        dataset: filtered.length > 0 ? filtered : origin,
        direction: null,
    }

    const sortableReducer = useCallback((state, action) => {
        switch (action.type) {
            case 'CHANGE_SORT':
                if (state.column === action.column) {
                    return {
                        ...state,
                        dataset: state.dataset.slice().reverse(),
                        direction:
                            state.direction === 'ascending' ? 'descending' : 'ascending',
                    }
                }

                return {
                    column: action.column,
                    dataset: _.orderBy(state.dataset, [action.column]),
                    direction: 'ascending',
                }
            default:
                throw new Error()
        }
    }, [])

    const [sortState, dispatchSort] = useReducer(sortableReducer, initialSortState)
    const { column, dataset, direction } = sortState

    useEffect(() => {
        const target = filtered.length > 0 ? 'filtered' : 'origin'
        setRowData({
            ...rowData,
            type: 'SORT_DATA',
            target: target,
            dataset: dataset,
            currentPage: page,
            currentPageSize: pageSize,
        })
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
                        </Table.HeaderCell>
                    )
                }
            </Table.Row>
        </Table.Header>
    )

}