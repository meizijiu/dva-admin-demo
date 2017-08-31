import React from 'react'
import ReactQuill from 'react-quill'
require('react-quill/dist/quill.snow.css')
require('react-quill/dist/quill.bubble.css')
require('react-quill/dist/quill.core.css')

export default class EditorPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({ text: value })
  }

  render () {
    return (
      <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} />
    )
  }
}
