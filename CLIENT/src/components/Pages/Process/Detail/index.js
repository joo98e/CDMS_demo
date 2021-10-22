import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { connect } from 'react-redux'

export const ProcessDetail = (props) => {
    const { ref_proc_id } = useParams();

    useEffect(() => {
        console.log(ref_proc_id);
    });

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
