import LcImage from './lc-image.vue'

export default {
    render: LcImage,
    editorProps: {
        src: {
            type: 'image',
            defaultValue: 'https://picsum.photos/200',
            display: 'URL'
        }
    }
};