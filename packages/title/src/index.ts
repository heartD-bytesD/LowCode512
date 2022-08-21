import App from './index.vue'
import './index.css'

export default {
    render: App,
    editorProps: {
        title: {
            type: 'string',
            defaultValue: '请输入文字', // 默认图的cdn
            display: '内容'
        },
        color: {
            type: 'color',
            defaultValue: '#606266',
            display: '颜色'
        },
        size: {
            type: 'number',
            defaultValue: 15,
            display: '大小'
        }
    }
};
