import React, {useState, useCallback} from 'react';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useCopyToClipboard } from 'react-use';
import Tooltip from '@material-ui/core/Tooltip';

interface IProps {
	text: string
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			color: '#00BFFF',
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
		},
		icon: {
			fontSize: 'small',
			marginRight: 10,
			color: 'black'
		}
	})
);

const CopyToText = ({ text }: IProps) => {
	const classes = useStyles();
	const [state, copyToClipboard] = useCopyToClipboard();
	const [statusCopy, setStatusCopy] = useState('copy');

	const toolTipTitle = () => {
		switch(statusCopy){
			case 'copy':
				return 'Copy';
			case 'copied':
				return 'Copied'
			default:
				return ''
		}
	}

	const handleClickCopy = useCallback(() => {
		copyToClipboard(text);
		setStatusCopy('copied');
	}, [copyToClipboard, text])

	return (
			<Tooltip title={toolTipTitle()} placement="bottom-start">
				<Button className={classes.root} onClick={handleClickCopy} onMouseLeave={() => setStatusCopy('copy')}>
					<FileCopyOutlinedIcon className={classes.icon} titleAccess="Копировать" />
					{text}
				</Button>
			</Tooltip>
	)
};

export default CopyToText;