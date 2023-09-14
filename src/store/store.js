import { createStore } from 'redux'
import { formContentReducer } from './formContentReducer'

export const store = createStore(formContentReducer)