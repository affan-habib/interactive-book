import React from "react";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import { useTranslation } from "react-i18next";

const ActionColumn = ({ onView, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-2 text-center">
      {onView && (
        <Tooltip content={t("view")} placement="top" arrow animation="shift-away">
          <button className="action-btn" type="button" onClick={onView}>
            <Icon icon="heroicons:eye" />
          </button>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip content={t("edit")} placement="top" arrow animation="shift-away">
          <button className="action-btn" type="button" onClick={onEdit}>
            <Icon icon="heroicons:pencil-square" />
          </button>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip
          content={t("delete")}
          placement="top"
          arrow
          animation="shift-away"
          theme="danger"
        >
          <button className="action-btn" type="button" onClick={onDelete}>
            <Icon icon="heroicons:trash" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default ActionColumn;