import React, { useState } from "react";
import Pagination from "@/components/ui/Pagination";
import TextInput from "@/components/ui/TextInput";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import ListLoading from "@/components/skeleton/ListLoading";

const GlobalFilter = ({ setFilter }) => {
    const [value, setValue] = useState("");
    const { t } = useTranslation();
    const onChange = (e) => {
        setValue(e.target.value);
        setFilter(e.target.value || undefined);
    };

    return (
        <div>
            <TextInput
                value={value || ""}
                onChange={onChange}
                placeholder={`${t("search")}...`}
                searchIcon
            />
        </div>
    );
};

const BasicTable = ({
    children,
    handleSearch,
    handlePageChange,
    totalPage,
    currentPage,
    title,
    filter = false,
    action = "",
    actionTitle = "create",
    headerSlot,
    footer = true,
}) => {
    const { t } = useTranslation();
    return (
        <>
            {title ? (
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">{t(title)}</h4>
                    {(filter || action) && (
                        <div className="flex space-x-2 ">
                            {filter && (
                                <GlobalFilter setFilter={handleSearch} />
                            )}
                            {action && (
                                <Link
                                    to={action}
                                    className="flex btn btn-primary btn-sm text-center items-center"
                                >
                                    <span className="text-white text-lg font-medium mr-1">
                                        <Icon icon="material-symbols:add" />
                                    </span>
                                    {t(actionTitle)}
                                </Link>
                            )}
                            {headerSlot ? headerSlot : null}
                        </div>
                    )}
                </div>
            ) : null}

            <div className="overflow-x-auto rounded-md border border-slate-200">
                <div className="inline-block min-w-full align-middle ">
                    <div className="overflow-hidden ">
                        <table className="striped-table">
                            {children ? children : null}
                        </table>
                    </div>
                </div>
            </div>
            {/* {!footer ? null : (
                <div className="md:flex md:space-y-0 space-y-5 justify-end mt-6 items-center">
                    <Pagination
                        totalPages={totalPage}
                        currentPage={currentPage}
                        handlePageChange={(p) => handlePageChange(p)}
                    />
                </div>
            )} */}
        </>
    );
};

export default BasicTable;
