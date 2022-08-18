import { IElement, PageElement } from "./element";
export interface IPage {
    // 名称
    name: string;
    // 描述
    description: string;
    // 页面元素
    elements: IElement[];
}

export class Page implements IPage {
    public name: string = "New Page";
    public description: string = "New Page Description";
    private _elements: PageElement[] = [];
    public get elements() {
        return this._elements.map((p) => p.getJson());
    }

    public static create(p?: IPage) {
        const page = new Page();
        if (p) {
            page.name = p.name;
            page.description = p.description;
            page._elements = p.elements.map((element) =>
                PageElement.create(element)
            );
        }
        return page;
    }

    constructor() {}

    public getElementById(id: string) {
        return this._elements.find((e) => e.id === id);
    }

    public addElement(element: PageElement) {
        this._elements.push(element);
    }

    public removeElement(element: PageElement) {
        const index = this._elements.findIndex(e => e.id === element.id)
        if (index >= 0) {
            this._elements.splice(index, 1);
        }
    }
    public insertElement(index: number, element: PageElement) {
        this._elements.splice(index, 0, element);
    }

    public clearElements() {
        this._elements.splice(0, this.elements.length);
        console.log(this._elements)
    }

    public getJson(): IPage {
        return {
            name: this.name,
            description: this.description,
            elements: this.elements,
        };
    }
}
