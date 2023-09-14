import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TypeElement = {
  PANEL: 'panel',
  LABEL: 'label',
  BUTTON: 'button',
}

const FormContent = () => {
  const [path, setPath] = useState('')
  const [newValue, setNewValue] = useState('')

  const dispatch = useDispatch()
  const content = useSelector(state => state.content)
  
  const renderElements = (el, key) => {
    let content;
    switch (el.type) {
      case TypeElement.PANEL:
        content = (
          <div style={{
            border: '1px solid #000000',
            width: `${el.props.width}px`,
            height: `${el.props.height}px`,
            display: el.props.visible ? 'block' : 'none',
          }}>
            {el.content && el.content.map((item, index) => renderElements(item, item.type+index))}
          </div>
        )
        break
      case TypeElement.LABEL:
        content =(
          <span style={{ display: el.props.visible ? 'inline' : 'none' }}>{el.props.caption}</span>
        )
        break
      case TypeElement.BUTTON:
        content =(
          <button style={{
            minWidth: `${el.props.width}px`,
            minHeight: `${el.props.height}px`,
            display: el.props.visible ? 'block' : 'none',
          }}>{el.props.caption}</button>
        )
        break
      default:
        break;
    }
    return (
      <React.Fragment key={key}>
        {content}
      </React.Fragment>
    )
  }

  const changeValue = (e) => {
    e.preventDefault()
    if (path.length === 0 || newValue.length === 0) return

    dispatch({type: 'CHANGE_VALUE', payload: [path, newValue]})
    setPath('')
    setNewValue('')
  }

  return (
    <>
      <form className='form'>
        <div className='form-input-wrapper'>
          <label>
            Путь
            <input value={path} onChange={(e) => setPath(e.target.value)} />
          </label>
        </div>
        
        <div className='form-input-wrapper'>
          <label>
            Новое значение
            <input  
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              disabled={path.length === 0}
            />
          </label>
        </div>
        
        <button type='submit' onClick={(e) => changeValue(e)}>Применить</button>
      </form>

      <div className='content'>
        {content && content.map((el, index) => renderElements(el, el.type + index))}
      </div>
    </>
  )
}

export default FormContent