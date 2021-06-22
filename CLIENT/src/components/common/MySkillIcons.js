import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/styles';
import { FaReact, FaNode } from 'react-icons/fa';
import { SiMaterialUi, SiMariadb, SiMysql, SiVisualstudiocode } from 'react-icons/si';

const styles = theme => ({
    marginR: {
        marginRight: theme.spacing(2),
    },
});

export class MySkillIcons extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <FaReact className={classes.marginR} size="36" />
                <FaNode className={classes.marginR} size="36" />
                <SiMariadb className={classes.marginR} size="36" />
                <SiMysql className={classes.marginR} size="36" />
                <SiMaterialUi className={classes.marginR} size="36" />
                <SiVisualstudiocode className={classes.marginR} size="36" />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MySkillIcons))
