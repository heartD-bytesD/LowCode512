const core = {
    id: 'core', // 唯一id，支持同id的包对此进行扩展
    version: '0.0.3', // 版本号
    name: '基础组件', // 分类名
    type: 'core', // 分类
    components: {
        'lc-button': () => import("./lc-button"),
        'lc-image': () => import("./lc-image"),
    }
}
!window['Lc'] && (window['Lc'] = {})
window['Lc'][core.id] = core