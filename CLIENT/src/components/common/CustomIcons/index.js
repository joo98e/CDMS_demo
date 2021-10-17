import { makeStyles } from "@material-ui/core"
import {
    LockOpen,
    ColorLens,
    Cached,
    TouchAppTwoTone,
    Menu,
    Home,
    Note,
    Cancel,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    NotificationImportant,
    Close,
    AddCircle,
    Business,
    MoreVert,
    Edit,
    Delete,
    NotificationsActive,
    Visibility,
    VisibilityOff,
    RadioButtonUnchecked,
    CheckCircleOutline,
    Favorite,
    ExitToApp,
    Info,
    Help,
    DateRange
} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
    color: { color: theme.palette.background.button ? theme.palette.background.button : "#FFF" }
}));



export const LockOpenIcon = () => {
    const classes = useStyles();
    return (
        <LockOpen className={classes.color} />
    )
}

export const ColorLensIcon = () => {
    const classes = useStyles();
    return (
        <ColorLens className={classes.color} />
    )
}


export const CachedIcon = () => {
    const classes = useStyles();
    return (
        <Cached className={classes.color} />
    )
}


export const TouchAppTwoToneIcon = () => {
    const classes = useStyles();
    return (
        <TouchAppTwoTone className={classes.color} />
    )
}


export const MenuIcon = () => {
    const classes = useStyles();
    return (
        <Menu className={classes.color} />
    )
}


export const HomeIcon = () => {
    const classes = useStyles();
    return (
        <Home className={classes.color} />
    )
}


export const NoteIcon = () => {
    const classes = useStyles();
    return (
        <Note className={classes.color} />
    )
}


export const CancelIcon = () => {
    const classes = useStyles();
    return (
        <Cancel className={classes.color} />
    )
}


export const KeyboardArrowLeftIcon = () => {
    const classes = useStyles();
    return (
        <KeyboardArrowLeft className={classes.color} />
    )
}


export const KeyboardArrowRightIcon = () => {
    const classes = useStyles();
    return (
        <KeyboardArrowRight className={classes.color} />
    )
}


export const NotificationImportantIcon = () => {
    const classes = useStyles();
    return (
        <NotificationImportant className={classes.color} />
    )
}


export const CloseIcon = () => {
    const classes = useStyles();
    return (
        <Close className={classes.color} />
    )
}


export const AddCircleIcon = () => {
    const classes = useStyles();
    return (
        <AddCircle className={classes.color} fontSize="large"/>
    )
}


export const BusinessIcon = () => {
    const classes = useStyles();
    return (
        <Business className={classes.color} />
    )
}


export const MoreVertIcon = () => {
    const classes = useStyles();
    return (
        <MoreVert className={classes.color} />
    )
}


export const EditIcon = () => {
    const classes = useStyles();
    return (
        <Edit className={classes.color} />
    )
}


export const DeleteIcon = () => {
    const classes = useStyles();
    return (
        <Delete className={classes.color} />
    )
}


export const NotificationsActiveIcon = () => {
    const classes = useStyles();
    return (
        <NotificationsActive className={classes.color} />
    )
}


export const VisibilityIcon = () => {
    const classes = useStyles();
    return (
        <Visibility className={classes.color} />
    )
}


export const VisibilityOffIcon = () => {
    const classes = useStyles();
    return (
        <VisibilityOff className={classes.color} />
    )
}


export const RadioButtonUncheckedIcon = () => {
    const classes = useStyles();
    return (
        <RadioButtonUnchecked className={classes.color} />
    )
}


export const CheckCircleOutlineIcon = () => {
    const classes = useStyles();
    return (
        <CheckCircleOutline className={classes.color} />
    )
}


export const FavoriteIcon = () => {
    const classes = useStyles();
    return (
        <Favorite className={classes.color} />
    )
}


export const ExitToAppIcon = () => {
    const classes = useStyles();
    return (
        <ExitToApp className={classes.color} />
    )
}


export const InfoIcon = () => {
    const classes = useStyles();
    return (
        <Info className={classes.color} />
    )
}

export const HelpIcon = () => {
    const classes = useStyles();
    return (
        <Help className={classes.color} />
    )
}

export const DateRangeIcon = () => {
    const classes = useStyles();
    return (
        <DateRange className={classes.color} />
    )
}

