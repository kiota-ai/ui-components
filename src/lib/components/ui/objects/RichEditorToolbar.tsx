/* eslint-disable react-refresh/only-export-components */

import { FC } from "react";

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'color'
]

interface QuillProps {
  toolbarClassName:string;
}

// Quill Toolbar component
export const QuillToolbar:FC<QuillProps> = ({ toolbarClassName }) => (
  <div id="toolbar" className={toolbarClassName}>
    <span className="ql-formats">
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <button className="ql-link" />
      <button className="ql-clean" />
    </span>
  </div>
)

export default QuillToolbar
