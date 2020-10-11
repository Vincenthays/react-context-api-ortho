export const ACTIONS = {
    CHANGE_AGE_SELECTED: 'change-age-selected',
    OPEN_VIDEO: 'open-video'
}

export const initValue = { 'ageId': null, video: null }

export default function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_AGE_SELECTED:
            return { ...state, 'ageId': action.ageId }
        case ACTIONS.OPEN_VIDEO:
            return { ...state, 'video': action.video }
        default:
            return state
    }
}
