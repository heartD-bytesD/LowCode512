interface ICategory {
    name: string;
}
interface IMaterialData {
    version: string;
    source: string;
}
interface IMaterial extends IMaterialData {
    id: number;
    name: string;
    title: string;
    thumbnail: string;
    type: string;
    category: ICategory;
    data: IMaterialData[];
}
interface IMaterialLoader {
    type: string;
    load(material: IMaterial): Promise<any>;
}

interface IElement {
    id: string;
    name: string;
    mId: number;
    mVersion: string;
    style: IElementStyle;
    props: Record<string, any>;
    events?: Record<string, any[]>;
}
interface IElementStyle {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    zIndex?: number;
}
declare class PageElement implements IElement {
    static create(e?: IElement, copy?: boolean): PageElement;
    id: string;
    name: string;
    mId: number;
    mVersion: string;
    style: IElementStyle;
    props: Record<string, any>;
    events: Record<string, any[]>;
    constructor();
    getJson(): IElement;
}

interface IPage {
    name: string;
    description: string;
    elements: IElement[];
    snapshots: Array<PageElement[]>;
}
declare class Page implements IPage {
    name: string;
    description: string;
    snapshots: PageElement[][];
    private _elements;
    get elements(): IElement[];
    static create(p?: IPage): Page;
    constructor();
    getElementById(id: string): PageElement;
    addElement(element: PageElement): void;
    removeElement(element: PageElement): void;
    insertElement(index: number, element: PageElement): void;
    refreshElements(index: number): void;
    saveSnapshot(): void;
    removeSnapshots(index: number): void;
    getJson(): IPage;
}

interface IProject {
    id: number;
    name: string;
    description: string;
    pages: IPage[];
}
declare class Project implements IProject {
    id: number;
    name: string;
    description: string;
    private _pages;
    static create(p?: IProject): Project;
    constructor();
    get pages(): IPage[];
    getPageByIndex(index: number): Page;
    addPage(page: Page): void;
    removePage(page: Page): void;
    insertPage(index: number, page: Page): void;
    getJson(): IProject;
}

declare function uuid(): string;

export { ICategory, IElement, IElementStyle, IMaterial, IMaterialData, IMaterialLoader, IPage, IProject, Page, PageElement, Project, uuid };
