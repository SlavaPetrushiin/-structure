import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IContacts } from '../../hooks.ts/useContacts';
import Avatar from '@material-ui/core/Avatar';
import CopyToText from '../../component/CopyToText';
import getNationality, { countries } from '../../helpers/nationality';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	large: {
    width: 100,
    height: 100,
  },
});


type PropsType = {
	contacts: IContacts[]
};

const ContactsCards = ({ contacts }: PropsType) => {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<>
			{contacts.map((user: IContacts) => {
				return (
					<Grid item xs={4} key={user.id}>
						<Card className={classes.root} variant="outlined">
							<CardContent>
								<Box display="flex" justifyContent="center" style={{marginBottom: 10}}>
									<Avatar alt={user.name} src={user.src} className={classes.large}/>
								</Box>
								<Typography variant="h5" component="h2">
									{user.name}
								</Typography>
								<Typography className={classes.pos} color="textSecondary">
									{user.data}, {user.age} years old
								</Typography>
								<Typography variant="body2" component="p">
									<CopyToText text={user.email} />
								</Typography>
								<Typography variant="body2" component="p">
									<CopyToText text={user.phone} />
								</Typography>
								<Typography variant="body2" component="p">
									{user.location}
								</Typography>
								<Typography variant="body2" component="p">
									{getNationality(user.nat as keyof typeof countries)}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				)
			})}
		</>
	)
};

export default ContactsCards;