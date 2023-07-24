type ParagraphModifier = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'mark';

export type ParagraphData = {
    type: 'text';
    data: {
        text: string;
    };
} | {
    type: 'link';
    href: string;
    data: ParagraphData[];
} | {
    type: 'linebreak';
} | {
    type: ParagraphModifier;
    data: ParagraphData[];
} ;

const parser = new DOMParser();

/**
 * This function will take a html string from Editor.js and convert it to a struct that can be used by the Content.Paragraph component.
 */
export function htmlToStruct(html: string | Element): ParagraphData[] {
    const data: ParagraphData[] = [];

    const doc = typeof html === 'string' ? parser.parseFromString(html, 'text/html').body : html;

    function parseElement(el: HTMLElement): ParagraphData {
        switch (el.tagName.toLowerCase()) {
            case 'br':
                return {
                    type: 'linebreak',
                };

            case 'strong':
            case 'b':
                return {
                    type: 'bold',
                    data: htmlToStruct(el),
                };

            case 'em':
            case 'i':
                return {
                    type: 'italic',
                    data: htmlToStruct(el),
                };

            case 'u':
                return {
                    type: 'underline',
                    data: htmlToStruct(el),
                };

            case 's':
                return {
                    type: 'strikethrough',
                    data: htmlToStruct(el),
                };

            case 'code':
                return {
                    type: 'code',
                    data: htmlToStruct(el),
                };

            case 'mark':
                return {
                    type: 'mark',
                    data: htmlToStruct(el),
                };

            case 'a':
                return {
                    type: 'link',
                    href: el.getAttribute('href') || '',
                    data: htmlToStruct(el),
                };
        }

        return {
            type: 'text',
            data: {
                text: el.textContent || '',
            }
        };
    }

    doc.childNodes.forEach(node => {
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                data.push({
                    type: 'text',
                    data: {
                        text: node.textContent || ''
                    }
                });

                break;

            case Node.ELEMENT_NODE:
                const element = node as HTMLElement;

                data.push(parseElement(element));

                break;
        }
    });

    return data;
}
