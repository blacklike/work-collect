import { createAction } from 'redux-actions'
import { UPDATEDEMO } from '../types'

export const UPDATEDEMOFN = createAction(UPDATEDEMO, () => {
  console.log('UPDATEDEMOFN');
  return {
    title: '测试'
  }
})