export const LINK = 'LINK';
export const BLOCK = 'BLOCK';
export const INSERT = 'INSERT';
export const INLINE = 'INLINE';

export const BLOCK_TYPES = [
    {icon: 'fas fa-quote-left', style: 'blockquote', label: 'blockQuote'},
    {icon: 'fas fa-heading', style: 'header-two', label: 'H2'},
    {icon: 'fas fa-code', style: 'code-block', label: 'Code'},
    {icon: 'fas fa-list-ul', style: 'unordered-list-item', label: 'List(Unordered)'},
    {icon: 'fas fa-list-ol', style: 'ordered-list-item', label: 'List(Ordered)'}
];

export const INLINE_TYPES = [
    {icon: 'fas fa-bold', style: 'BOLD', label: 'bold'},
    {icon: 'fas fa-italic', style: 'ITALIC', label: 'italic'},
    {icon: 'fas fa-underline', style: 'UNDERLINE', label: 'underline'},
    {icon: 'fas fa-strikethrough', style: 'STRIKETHROUGH', label: 'strikethrough'}
];

export const INSERT_OPTIONS = [
    {icon: 'fas fa-link', style: LINK, label: 'link', active: false}
];