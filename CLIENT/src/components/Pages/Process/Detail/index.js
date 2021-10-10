import React from 'react'
import { connect } from 'react-redux'

export const ProcessDetail = (props) => {
    return (
        <div>
            프로세스 디테일 페이지입니다.
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDetail)
