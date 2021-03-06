import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions/index'
import StreamForm from './StreamForm';

class StreamEdit extends Component {

    componentDidMount() {
        //This we have done because we do not have stream when we don not add this
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        if(!this.props.stream){
            return <div>Loading....</div>
        }
        return ( 
            <div>
                <h3>Edit A Stream</h3>
                <StreamForm initialValues = {{title: this.props.stream.title, description: this.props.stream.description}} onSubmit = {this.onSubmit}/>
            </div>
         );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);