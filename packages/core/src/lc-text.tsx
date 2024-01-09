import { createProp } from './utils'

const render = {
  setup(props) {
    const { title, color, backgroundColor } = props;
    const style = { color, backgroundColor };
    return <div style={style}>{title}</div>;
  }
}

const editorProps = {
  title: createProp<Prop.Input>('input', {
    label: '内容',
    defVal: '请输入文字',
  }),
  color: createProp<Prop.Font>('font', {
    label: '字体',
    defVal: {
      color: '#000000',
      fontSize: 16,
      bold: false,
      italic: false,
      strike: false,
    }
  }),
  backgroundColor: createProp<Prop.Color>('color', {
    label: '背景色',
    defVal: ''
  }),
}

export default {
  render,
  editorProps
};
