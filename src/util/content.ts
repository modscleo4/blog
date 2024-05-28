type Paragraph = {
    type: 'paragraph',
    data: {
        text: string,
    },
};

type Header = {
    type: 'header',
    data: {
        text: string,
        level: number,
    },
};

type Code = {
    type: 'code',
    data: {
        language?: string,
        code: string,
    },
};

type List = {
    type: 'list',
    data: {
        style: 'ordered' | 'unordered',
        items: string[],
    },
};

type Checklist = {
    type: 'checklist',
    data: {
        items: {
            text: string,
            checked: boolean,
        }[],
    },
};

type Quote = {
    type: 'quote',
    data: {
        text: string,
        caption: string,
        alignment: 'left' | 'center' | 'right',
    },
};

type Warning = {
    type: 'warning',
    data: {
        title: string,
        message: string,
    },
};

type Delimiter = {
    type: 'delimiter',
    data: {},
};

type Table = {
    type: 'table',
    data: {
        withHeadings: boolean,
        content: string[][],
    },
};

export type PostContentBlock = Paragraph | Header | Code | List | Checklist | Quote | Warning | Delimiter | Table;

export type PostContent = {
    time?: number,
    blocks?: PostContentBlock[],
    version?: string,
};

export type NestedHeader = Header & { subheaders?: NestedHeader[] };

export function extractHeaders(content: PostContent): NestedHeader[] {
    const headers = content.blocks?.filter(block => block.type === 'header') as Header[];

    if (!headers) return [];

    let nestedHeaders: NestedHeader[] = [];
    let currentHeader: NestedHeader | undefined;

    function addHeader(header: NestedHeader) {
        if (currentHeader) {
            if (header.data.level > currentHeader.data.level) {
                if (!currentHeader.subheaders) currentHeader.subheaders = [];
                currentHeader.subheaders.push(header);
            } else {
                nestedHeaders.push(header);
            }
        } else {
            nestedHeaders.push(header);
        }

        currentHeader = header;
    }

    for (const header of headers) {
        addHeader(header);
    }

    return nestedHeaders;
}
