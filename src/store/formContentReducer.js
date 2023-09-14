const defaultState = {
  content: [
    {
      type: 'panel',
      props: {
        width: 500,
        height: 200,
        visible: true
      },
      content: [{
        type: 'label',
        props: {
          caption: 'internal text',
          visible: true
        }
      }]
    
    },
    {
      type: 'label',
      props: {
        caption: 'test',
        visible: true
      },
    },
    {
      type: 'button',
      props: {
        width: 100,
        height: 50,
        visible: true,
        caption: 'button'
      },
    },
    
  ]
}

const changeValue = (content, path, newValue) => {
  let result = content
  const keys = path.trim().split('.')
  const pathes = []

  for (const key of keys) {
    const arrayKey = key.match(/^([^[]+)\[(\d+)\]$/)
    if (arrayKey) {
      const arrKey = arrayKey[1];
      const arrIndex = arrayKey[2];
      pathes.push(arrKey)
      pathes.push(arrIndex)
    } else {
      pathes.push(key)
    }
  }

  for (const i in pathes) {
    if (i < pathes.length - 1) {
      const path = pathes[i]
      result = result[path]    
    }
  }

  const pathToChange = pathes[pathes.length - 1]
  
  if(typeof newValue === 'string' && newValue.includes('{','}')) {
    const jsonStr = newValue.replace(/'/g, '"');

    newValue = eval(`(${jsonStr})`); 

    // eval считается небезопасным вариантом, как альтернатива я оставил вариант с JSON, который находится ниже
    // {"type": "button", "props": {"caption": "test", "visible": true}}
    // newValue = JSON.parse(newValue);
  }
  
  if (pathToChange === 'visible') {
    newValue = (newValue === 'true') ? true : (newValue === 'false') ? false : newValue;
  }
  
  result[pathToChange] = newValue
}

export const formContentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      let [path, newValue] = action.payload
      const newState = {...state}
      
      newValue = isNaN(newValue) ? newValue.trim() : +newValue
      
      changeValue(newState, path, newValue)
      
      return {
        ...state, 
        content: newState.content
      }
    default:
     return state
  }
}