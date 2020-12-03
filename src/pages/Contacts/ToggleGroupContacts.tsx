import React, {useCallback} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { DATA_VIEW_MODES } from './constans';

interface IProps {
	dataViewMode: any
	setDataViewMode: any
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		contactsHead: {
			marginBottom: 20
		}
	})
);

const ToggleGroupContacts = ({dataViewMode, setDataViewMode}: IProps) => {
	const classes = useStyles();

	const handleChange = useCallback((event: React.MouseEvent<HTMLElement>, nextView: any) => {
		setDataViewMode(nextView);
  }, [setDataViewMode]);

	return (
		<>
			<Box className={classes.contactsHead} display="flex" justifyContent="space-between">
				<Typography variant="h4">Contacts</Typography>
				<Box display="flex">
					<ToggleButtonGroup value={dataViewMode} exclusive onChange={handleChange}>
						<ToggleButton value={DATA_VIEW_MODES.TABLE} aria-label={DATA_VIEW_MODES.TABLE}>
							<ViewListIcon />
						</ToggleButton>
						<ToggleButton value={DATA_VIEW_MODES.GRID} aria-label={DATA_VIEW_MODES.GRID}>
							<ViewModuleIcon />
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Box>
		</>
	)
}

export default ToggleGroupContacts;