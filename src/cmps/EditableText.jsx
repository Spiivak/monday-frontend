import { Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

export function EditableText({ initialText, onSave }) {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [originalText, setOriginalText] = useState(initialText);

  const handleToggleEditing = () => {
    setEditing(!isEditing);
  };



  const handleSave = () => {
  if (text !== '') {
      onSave(text)
    } else {
      setText(originalText)
    }

    setEditing(false)
  }
  
  const showTooltip = text.length < 50;
  return (
    <div style={{ width: '100%'}}>
      {isEditing ? (
        <div style={{ width: 'max-content', position: 'relative'}} >
          <input
            style={{ width: 'max-content'}}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            autoFocus
          />
        </div>
      ) : (
        <Tooltip title={showTooltip ? `Click to edit` : `${text}`} placement='top' arrow>
        <div
        onClick={handleToggleEditing}
        >
          {text}
        </div>
        </Tooltip>
      )}
    </div>
  );
}
