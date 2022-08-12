import App from './index.vue'
import './index.css'

export default {
    render: App,
    editorProps: {
        title: {
            type: 'string',
            defaultValue: '请输入文字' // 默认图的cdn
        },
        color: {
            type: 'color',
            defaultValue: '#333'
        },
        size: {
            type: 'number',
            defaultValue: 16
        }
    }
};