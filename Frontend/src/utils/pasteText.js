import { EditorState, Modifier } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import sanitizeHtml from "sanitize-html";

const getSelectedBlock = (editorState) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockStartKey = selection.getStartKey();

  return contentState.getBlockMap().get(blockStartKey);
};

const handlePastedText = (text, html, editorState, onChange) => {
  try {
    const selectedBlock = getSelectedBlock(editorState);
    if (selectedBlock && selectedBlock.getType() === "code") {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text,
        editorState.getCurrentInlineStyle()
      );
      onChange(
        EditorState.push(editorState, contentState, "insert-characters")
      );
      return true;
    } else if (html) {
      // const fixedHTML = html.replace(/<img.*>/gi, "\n");
      let fixedHTML = sanitizeHtml(html)
        .replace(/(<\/?)img((?:\s+.*?)?>)/g, "")
        .replace(/(<\/?)figure((?:\s+.*?)?>)/g, "");
      const blockMap = stateFromHTML(fixedHTML).getBlockMap();
      const newState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        blockMap
      );
      onChange(EditorState.push(editorState, newState, "insert-fragment"));
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export default handlePastedText;
