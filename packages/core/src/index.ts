(() => {
    const func = () => ({
        id: 'core', // 唯一id，支持同id的包对此进行扩展
        version: '0.0.3', // 版本号
        name: '基础组件', // 分类名
        type: 'core', // 分类
        components: {
            'lc-button': () => import("./lc-button"),
            'lc-image': () => import("./lc-image"),
            'lc-text': () => import("./lc-text"),
        }
    })
    !window['Lc'] && (window['Lc'] = {});
    const plugin = func();
    window['Lc'][plugin.id] = plugin;
})();