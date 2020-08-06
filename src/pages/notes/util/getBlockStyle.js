export const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'blockquote':
            return 'editor-blockquote';
        default:
            return null;
    }
};