import App from './index.vue'
import './index.css'

export default {
    render: App,
    editorProps: {
        src: {
            type: 'image',
            defaultValue: 'https://picsum.photos/200',
            display: 'URL'
        }
    }
};