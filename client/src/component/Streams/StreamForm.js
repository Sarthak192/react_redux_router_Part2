import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {

    renderError = (display) => {
        if (display.touched && display.error) {
            return (
                <div className="ui error message">
                    <div className="header">{display.error}</div>
                </div>
            )
        }
    }

    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
        return (
            // <input onChange = {formProps.input.onChange} value = {formProps.input.value}/>
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>

        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field label="Enter Title" name="title" component={this.renderInput} />
                <Field label="Enter Description" name="description" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const error = {}

    if (!formValues.title) {
        error.title = "You must enter a title"
    }

    if (!formValues.description) {
        error.description = "You must enter a description"
    }

    return error
}

export default reduxForm({
    form: "streamForm",
    validate: validate
})(StreamForm);