import App from './index.vue'
import './index.css'

export default {
    render: App,
    editorProps: {
        src: {
            type: 'string',
            defaultValue: 'https://picsum.photos/200' // 默认图的cdn
        }
    }
};