export function createProp<T>(type: string, props: T) {
  return { editType: type, props }
}

