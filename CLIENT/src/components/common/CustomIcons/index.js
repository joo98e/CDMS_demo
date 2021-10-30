import { withStyles } from '@material-ui/styles';
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
    DateRange,
    Search,
    ArrowDownward,
    Star,
    Mail,
    ViewList,
    Subject,
    Attachment
} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
    color: {
        color: theme.palette.background.whiteButton ? theme.palette.background.whiteButton : "#FFF"
    },
    descColor: {
        color: theme.palette.text.desc
    }
}));

export const LockOpenIcon = props => {
    const classes = useStyles();
    return (
        <LockOpen className={classes.color} {...props} />
    )
}

export const ColorLensIcon = props => {
    const classes = useStyles();
    return (
        <ColorLens className={classes.color} {...props} />
    )
}

export const CachedIcon = props => {
    const classes = useStyles();
    return (
        <Cached className={classes.color} {...props} />
    )
}

export const TouchAppTwoToneIcon = props => {
    const classes = useStyles();
    return (
        <TouchAppTwoTone className={classes.color} {...props} />
    )
}

export const MenuIcon = props => {
    const classes = useStyles();
    return (
        <Menu className={classes.color} {...props} />
    )
}

export const HomeIcon = props => {
    const classes = useStyles();
    return (
        <Home className={classes.color} {...props} />
    )
}

export const NoteIcon = props => {
    const classes = useStyles();
    return (
        <Note className={classes.color} {...props} />
    )
}

export const CancelIcon = props => {
    const classes = useStyles();
    return (
        <Cancel className={classes.color} {...props} />
    )
}

export const KeyboardArrowLeftIcon = props => {
    const classes = useStyles();
    return (
        <KeyboardArrowLeft className={classes.color} {...props} />
    )
}

export const KeyboardArrowRightIcon = props => {
    const classes = useStyles();
    return (
        <KeyboardArrowRight className={classes.color} {...props} />
    )
}

export const NotificationImportantIcon = props => {
    const classes = useStyles();
    return (
        <NotificationImportant className={classes.color} {...props} />
    )
}

export const CloseIcon = props => {
    const classes = useStyles();
    return (
        <Close className={classes.color} {...props} />
    )
}

export const AddCircleIcon = () => {
    const classes = useStyles();
    return (
        <AddCircle className={classes.color} fontSize="large" />
    )
}

export const BusinessIcon = props => {
    const classes = useStyles();
    return (
        <Business className={classes.color} fontSize={props.fontSize && props.fontSize} {...props} />
    )
}

export const MoreVertIcon = props => {
    const classes = useStyles();
    return (
        <MoreVert className={classes.color} {...props} />
    )
}

export const EditIcon = props => {
    const classes = useStyles();
    return (
        <Edit className={classes.color} {...props} />
    )
}

export const DeleteIcon = props => {
    const classes = useStyles();
    return (
        <Delete className={classes.color} {...props} />
    )
}

export const NotificationsActiveIcon = props => {
    const classes = useStyles();
    return (
        <NotificationsActive className={classes.color} {...props} />
    )
}

export const VisibilityIcon = props => {
    const classes = useStyles();
    return (
        <Visibility className={classes.color} {...props} />
    )
}

export const VisibilityOffIcon = props => {
    const classes = useStyles();
    return (
        <VisibilityOff className={classes.color} {...props} />
    )
}

export const RadioButtonUncheckedIcon = props => {
    const classes = useStyles();
    return (
        <RadioButtonUnchecked className={classes.color} {...props} />
    )
}

export const CheckCircleOutlineIcon = props => {
    const classes = useStyles();
    return (
        <CheckCircleOutline className={classes.color} {...props} />
    )
}

export const FavoriteIcon = () => {
    return (
        <Favorite />
    )
}

export const RatingHeartIcon = () => {
    return (
        <Favorite />
    )
}

export const RatingStarIcon = (props) => {
    return (
        <Star {...props} />
    )
}

export const FollowStarIcon = (props) => {
    const classes = useStyles();
    return (
        <Star className={classes.descColor} {...props} />
    )
}

export const ExitToAppIcon = props => {
    const classes = useStyles();
    return (
        <ExitToApp className={classes.color} {...props} />
    )
}

export const InfoIcon = props => {
    const classes = useStyles();
    return (
        <Info className={classes.color} {...props} />
    )
}

export const HelpIcon = props => {
    const classes = useStyles();
    return (
        <Help className={classes.color} {...props} />
    )
}

export const DateRangeIcon = props => {
    const classes = useStyles();
    return (
        <DateRange className={classes.color} {...props} />
    )
}

export const SearchIcon = props => {
    const classes = useStyles();
    return (
        <Search className={classes.color} {...props} />
    )
}

export const ArrowDownwardIcon = props => {
    const classes = useStyles();
    return (
        <ArrowDownward className={classes.color} {...props} />
    )
}

export const MailIcon = props => {
    const classes = useStyles();
    return (
        <Mail className={classes.color} {...props} />
    )
}

export const ViewListIcon = props => {
    const classes = useStyles();
    return (
        <ViewList className={classes.color} {...props} />
    )
}

export const SubjectIcon = props => {
    const classes = useStyles();
    return (
        <Subject className={classes.color} {...props} />
    )
}

export const AttachmentIcon = props => {
    const classes = useStyles();
    return (
        <Attachment className={classes.color} {...props} {...props} />
    )
}
