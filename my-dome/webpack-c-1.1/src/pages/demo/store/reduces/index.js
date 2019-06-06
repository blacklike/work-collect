import { handleActions, combineActions } from 'redux-actions'
import { UPDATEDEMO } from '../types'

const defaultState = {
  loaded: true
}

const reducer = handleActions({
  [UPDATEDEMO](state, action){
    return {
      ...state,
      ...action.payload
    }
  }
},defaultState)


export default reducer