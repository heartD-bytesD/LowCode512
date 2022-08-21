import App from './index.vue'
import './index.css'

export default {
    render: App,
    editorProps: {
        title: {
            type: 'string',
            defaultValue: '请输入文字',
            display: '内容'
        },
        color: {
            type: 'color',
            defaultValue: '#333',
            display: '颜色'
        },
        size: {
            type: 'number',
            defaultValue: 16,
            display: '大小'
        },
        value: {
            type: 'value',
            defaultValue: 50,
            display: '值'
        }
    }
};