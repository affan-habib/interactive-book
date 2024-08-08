import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "@/server/api";
import { setZones, setDivisions, setDistricts, setUpazilas } from "@/store/geo";

const useCourse = () => {
    const dispatch = useDispatch();
    const { zones, allDivisions, allDistricts, allUpazilas } = useSelector(
        (state) => state.geo
    );

    useEffect(() => {
        loadZone();
        loadDivisions();
        loadDistricts();
        loadUpazilas();
    }, []);

    const loadZone = () => {
        if (zones.length === 0) {
            api.get("/zones")
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(setZones(response.data.data));
                    }
                })
                .catch((error) => {});
        }
    };
    const loadDivisions = () => {
        if (allDivisions.length === 0) {
            api.get("/divisions")
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(setDivisions(response.data.data));
                    }
                })
                .catch((error) => {});
        }
    };
    const loadDistricts = () => {
        if (allDistricts.length === 0) {
            api.get("/districts")
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(setDistricts(response.data.data));
                    }
                })
                .catch((error) => {});
        }
    };
    const loadUpazilas = () => {
        if (allUpazilas.length === 0) {
            api.get("/upazilas")
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(setUpazilas(response.data.data));
                    }
                })
                .catch((error) => {});
        }
    };
};

export default useCourse;
