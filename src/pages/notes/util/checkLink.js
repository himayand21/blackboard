export const checkLink = ({
    entities,
    selection,
    block
}) => {
    const selectStartKey = selection.getStartKey();
    const selectEndKey = selection.getEndKey();
    const selectStart = selection.getStartOffset();
    const selectEnd = selection.getEndOffset();
    const isCollapsed = selection.isCollapsed();
    const hasFocus = selection.getHasFocus();
    if (selectStart === selectEnd || selectStartKey !== selectEndKey || isCollapsed || !hasFocus) return [false];
    if (!entities.length) return [true, false];
    const selectedLinkEntity = entities.find(({start, end}) => ((start === selectStart) && (end === selectEnd)));
    if (selectedLinkEntity) {
        return [true, true, block.getEntityAt(selectedLinkEntity.start)];
    }
    return [false];
};