export interface ICategory {
    name: string;
}

export interface IMaterialData {
    // 版本
    version: string;
    // 物料源
    source: string;
}

export interface IMaterial extends IMaterialData{
    id: number;
    // 组件名
    name:string;
    // 显示名
    title: string;
    // 缩略图
    thumbnail:string;
    // 类型
    type: string;
    // 类目
    category: ICategory;
    // 数据
    data: IMaterialData[];
}

export interface IMaterialLoader {
    type: string;
    load(material: IMaterial): Promise<any>;
}