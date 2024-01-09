import { createProp } from './utils'
const render = {
  setup() {
    return () => <div>TSX</div>;
  }
}

export default {
  render,
  editorProps: {
    title: createProp<FormMap.Input>({
      defVal: '请输入文字',
      label: '内容',
    })
  }
};
