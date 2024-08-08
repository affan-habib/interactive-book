import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import useDataFetching from "../../../../hooks/useDataFetching";
import { BASE_URL } from "../../../../config";
import dayjs from "dayjs";
import api from "@/server/api";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const notifyLabel = (count) => {
    return (
        <span className="relative lg:h-[32px] lg:w-[32px] text-slate-100 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
            <Icon icon="heroicons-outline:bell" className=" w-8 h-8" />
            {
                count != 0 && <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
                    {count}
                </span>
            }
        </span>
    );
};

const Notification = () => {
    const queryClient = useQueryClient();
    const { data } = useDataFetching({
        queryKey: "notifications",
        endPoint: `${BASE_URL}/notification-service/api/my-notifications`,
    });
    const navigate = useNavigate()
    const markAsRead = async (id) => {
        try {
            await api.post(`${BASE_URL}/notification-service/api/mark-notification-as-read/${id}`, null, false);
            queryClient.invalidateQueries("notifications");
            const notification = data?.data?.find(item => item.id === id);
            if (notification && notification.redirection_path === "course") {
                navigate(`/course-details/${notification.content_id}`);
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    return (
        <Dropdown
            classMenuItems="md:w-[300px] top-[48px]"
            label={notifyLabel(data?.data?.filter(item => !item.is_read).length)}
        >
            <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
                <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
                    Notifications
                </div>
                <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
                    <Link className="underline" to="/all-notifications">
                        View all
                    </Link>
                </div>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {data?.data?.slice(0, 5).map((item, i) => (
                    <Menu.Item key={i}>
                        {({ active }) => (
                            <div
                                className={`${active
                                    ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                                    : "text-slate-600 dark:text-slate-300"
                                    } block w-full px-4 py-2 text-sm  cursor-pointer`}
                                onClick={() => markAsRead(item.id)}
                            >
                                <div className="flex ltr:text-left rtl:text-right">
                                    <div className="flex-none ltr:mr-3 rtl:ml-3">
                                        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                                            {item.thumbnail ? (
                                                <img
                                                    src={item.thumbnail}
                                                    alt=""
                                                    className={`${active
                                                        ? " border-white"
                                                        : " border-transparent"
                                                        } block w-full h-full object-cover rounded-full border`}
                                                />
                                            ) : (
                                                <Icon icon="heroicons-outline:bell" className="text-slate-400 text-2xl" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div
                                            className={`${active
                                                ? "text-slate-600 dark:text-slate-300"
                                                : " text-slate-600 dark:text-slate-300"
                                                } text-sm`}
                                        >
                                            {item.title}
                                        </div>
                                        <div
                                            className={`${active
                                                ? "text-slate-500 dark:text-slate-200"
                                                : " text-slate-600 dark:text-slate-300"
                                                } text-xs leading-4`}
                                        >
                                            {item.details}
                                        </div>
                                        <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">

                                            {dayjs(item?.created_at).fromNow(true)}
                                        </div>
                                    </div>
                                    {!item.is_read && (
                                        <div className="flex-0">
                                            <span className="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Menu.Item>
                ))}
            </div>
        </Dropdown>
    );
};

export default Notification;
