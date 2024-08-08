import React, { useState, useMemo } from "react";
import { advancedTable } from "@/constant/table-data";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import Textinput from "@/components/ui/TextInput";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "@/components/ui/Pagination";

const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);
    const onChange = (e) => {
        setValue(e.target.value);
        setFilter(e.target.value || undefined);
    };
    return (
        <div>
            <Textinput
                value={value || ""}
                onChange={onChange}
                placeholder="Search..."
                searchIcon
            />
        </div>
    );
};

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input
                    type="checkbox"
                    ref={resolvedRef}
                    {...rest}
                    name={`checkbox`}
                    className="table-checkbox"
                />
            </>
        );
    }
);

const ReactTable = ({
    COLUMNS,
    title = "list",
    filter,
    action,
    tableData,
    selection,
    footer = true,
}) => {
    const columns = useMemo(() => COLUMNS, [COLUMNS]);
    const data = useMemo(() => tableData, [tableData]);
    const { t } = useTranslation();

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            selection && data.length
                ? hooks.visibleColumns.push((columns) => [
                      {
                          id: "selection",
                          Header: ({ getToggleAllRowsSelectedProps }) => (
                              <div>
                                  <IndeterminateCheckbox
                                      {...getToggleAllRowsSelectedProps()}
                                  />
                              </div>
                          ),
                          Cell: ({ row }) => (
                              <div>
                                  <IndeterminateCheckbox
                                      {...row.getToggleRowSelectedProps()}
                                  />
                              </div>
                          ),
                      },
                      ...columns,
                  ])
                : null;
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;
    return (
        <>
            <div className="md:flex justify-between items-center mb-6">
                <h4 className="card-title">{t(title)}</h4>
                {(filter || action) && (
                    <div className="flex space-x-2">
                        {filter && (
                            <GlobalFilter
                                filter={globalFilter}
                                setFilter={setGlobalFilter}
                            />
                        )}
                        {action ? action : null}
                    </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden ">
                        <table
                            className="striped-table min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            {...getTableProps}
                        >
                            <thead className="bg-slate-200 dark:bg-slate-700">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(
                                                    column.getSortByToggleProps()
                                                )}
                                                scope="col"
                                                className=""
                                            >
                                                {column.render("Header")}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? " 🔽"
                                                            : " 🔼"
                                                        : ""}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody
                                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                {...getTableBodyProps}
                            >
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className=""
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {!footer ? null : (
                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            className="form-control py-2 w-max"
                            value={pageSize}
                            onChange={(e) =>
                                setPageSize(Number(e.target.value))
                            }
                        >
                            {[5, 10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{" "}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <Pagination
                        totalPages={pageCount}
                        currentPage={pageIndex}
                        handlePageChange={(p) => gotoPage(p)}
                        isReactTable={true}
                    />
                </div>
            )}
        </>
    );
};

export default ReactTable;
