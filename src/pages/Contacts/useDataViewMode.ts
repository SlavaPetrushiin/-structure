import { useState, useEffect } from "react";
import { DATA_VIEW_MODES } from "./constans";

const getInitialDataViewMode = () => {
	return localStorage.getItem('view') || DATA_VIEW_MODES.TABLE;
}

export const useDataViewMode = () => {
	const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

	useEffect(() => {
		localStorage.setItem('view', dataViewMode);
	}, [dataViewMode])

	return [dataViewMode, setDataViewMode];
}