import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuIcon from '@material-ui/icons/Menu';
import MuiAlert from '@material-ui/lab/Alert';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

export const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#1c1c1c'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#c2c2c2'
			},
			'&:hover': {
				borderColor: '#1c1c1c'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#1c1c1c'
			}
		}
	}
})(TextField);

export const CssCircularProgress = withStyles({
	root: {
		'&.MuiCircularProgress-root': {
			color: '#1c1c1c'
		}
	}
})(CircularProgress);

export const CssInputLabel = withStyles({
	root: {
		'&.MuiInputLabel-root': {
			color: '#8a8a8a'
		},
		'&.Mui-focused': {
			color: '#1c1c1c'
		}
	}
})(InputLabel);

export const OutlinedInputField = withStyles({
	root: {
		'&.MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#c2c2c2'
			},
			'&:hover': {
				borderColor: '#1c1c1c'
			},
			'&.Mui-focused fieldset': {
				borderColor: '#1c1c1c'
			}
		}
	}
})(OutlinedInput);

export const CssNavbarCircularProgress = withStyles({
	root: {
		'&.MuiCircularProgress-root': {
			color: 'whitesmoke'
		}
	}
})(CircularProgress);

export const CssDrawer = withStyles({
	root: {
		'& .MuiPaper-root': {
			width: '50%'
		}
	}
})(Drawer);

export const CssMenuIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: 'whitesmoke'
		}
	}
})(MenuIcon);

export const CssPostAddIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: 'whitesmoke',
			padding: '5px'
		}
	}
})(PostAddIcon);

export const DrawerCssPostAddIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: '#1c1c1c',
			padding: '5px'
		}
	}
})(PostAddIcon);

export const CssCollectionsBookmarkIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: 'whitesmoke',
			padding: '5px'
		}
	}
})(CollectionsBookmarkIcon);

export const DrawerCssCollectionsBookmarkIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: '#1c1c1c',
			padding: '5px'
		}
	}
})(CollectionsBookmarkIcon);

export const CssExitToAppIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: 'whitesmoke',
			padding: '5px'
		}
	}
})(ExitToAppIcon);

export const DrawerCssExitToAppIcon = withStyles({
	root: {
		'&.MuiSvgIcon-root': {
			color: '#1c1c1c',
			padding: '5px'
		}
	}
})(ExitToAppIcon);

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CssAlert = withStyles({
	root: {
		'&.MuiAlert-root': {
			backgroundColor: '#d4574e'
		}
	}
})(Alert);
