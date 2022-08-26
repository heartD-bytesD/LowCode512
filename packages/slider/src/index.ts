import App from './index.vue'
import './index.css'

export default {
    render: App,
    editorProps: {
        title: {
            type: 'string',
            defaultValue: '',
            display: '内容'
        },
        color: {
            type: 'color',
            defaultValue: '#165DFF',
            display: '滑块颜色'
        },
        barSize: {
            type: 'number',
            defaultValue: 16,
            display: '滑条高度',
            min: 1,
            max: 100
        },
        textSize: {
            type: 'number',
            defaultValue: 16,
            display: '文字大小',
            min: 1,
            max: 100
        },
        // round: {
        //     type: 'checkbox',
        //     defaultValue: false,
        //     display: '圆型滑块',
        // },
        value: {
            type: 'value',
            defaultValue: 50,
            display: '值'
        },

        // 没有透明度 -> 直接不加
        // opacity: {
        //     type: 'slider',
        //     defaultValue: 50,
        //     display: '滑条透明度',
        //     min: 0,
        //     max: 1,
        // }
    }
};
