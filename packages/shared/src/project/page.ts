import { IElement, PageElement } from "./element";
export interface IPage {
    // 名称
    name: string;
    // 描述
    description: string;
    // 页面元素
    elements: IElement[];
    // 元素快照，用于撤销/重做
    snapshots: Array<PageElement[]>;
}

export class Page implements IPage {
    public name: string = "New Page";
    public description: string = "New Page Description";
    public snapshots: PageElement[][] = [[]];
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
            page.snapshots = p.snapshots ? p.snapshots.map((elements) => [...elements]) : [[]];
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

    public refreshElements(index: number) {
        const newSnapshot : PageElement[]= this.snapshots[index];
        // this._elements = newSnapshot;
        this._elements.splice(0, this._elements.length);
        this._elements.push(...newSnapshot);
    }

    public saveSnapshot() {
        // Invalid copy
        // let newSnapshot: PageElement[] = this._elements.map(element => element)
        // this.snapshots = [...this.snapshots, newSnapshot];
        // this.snapshots = [...this.snapshots.map((elements) => elements.slice()), this._elements.map((element) => element)]
        
        // this.snapshots = [...JSON.parse(JSON.stringify(this.snapshots)), newSnapshot]; // Deep copy but lose all methods on PageElement
        this.snapshots.push((this._elements.map(element => PageElement.create(element))));
    }

    // Remove all snapshots after this index
    public removeSnapshots(index: number) {
        const snapshotsLength = this.snapshots.length;
        console.log("Before remove snapshots", this.snapshots)
        if(index >= snapshotsLength) {
            return;
        }
        console.log("To be removed: ", index + 1, snapshotsLength - index - 1)
        // this.snapshots.splice(index + 1, snapshotsLength - index - 1);
        console.log("After remove snapshots: ", this.snapshots)
    }

    public getJson(): IPage {
        return {
            name: this.name,
            description: this.description,
            elements: this.elements,
            snapshots: this.snapshots,
        };
    }
}
