export type PostContentBlock = {
    type: 'paragraph',
    data: {
        text: string,
    },
} | {
    type: 'header',
    data: {
        text: string,
        level: number,
    },
} | {
    type: 'code',
    data: {
        language?: string,
        code: string,
    },
} | {
    type: 'list',
    data: {
        style: 'ordered' | 'unordered',
        items: string[],
    },
} | {
    type: 'checklist',
    data: {
        items: {
            text: string,
            checked: boolean,
        }[],
    },
} | {
    type: 'quote',
    data: {
        text: string,
        caption: string,
        alignment: 'left' | 'center' | 'right',
    },
} | {
    type: 'warning',
    data: {
        title: string,
        message: string,
    },
} | {
    type: 'delimiter',
    data: {},
} | {
    type: 'table',
    data: {
        withHeadings: boolean,
        content: string[][],
    },
};

export type PostContent = {
    time?: number,
    blocks?: PostContentBlock[],
    version?: string,
};
