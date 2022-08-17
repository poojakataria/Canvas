import { FETCH_PROFILE, UPDATE_PROFILE, ENABLE_EDITING, UPLOAD_IMAGE } from '../actions/userProfileAction';


export default function (
    state = {
        image: '',
        imagePreview: '',
        name: '',
        email: '',
        phone: '',
        aboutMe: '',
        city: '',
        country: '',
        company: '',
        school: '',
        hometown: '',
        languages: '',
        gender: '',
        isVisible: false,
        file: null,
        imageUrl: 'uploads/unknown.jpg',
        disabled: false
    }, action) {
    console.log("state in reducer", state)
    switch (action.type) {
        case FETCH_PROFILE:
            return {
                name: action.name,
                email: action.email,
                phone: action.phone,
                aboutMe: action.aboutMe,
                city: action.city,
                country: action.country,
                company: action.company,
                school: action.school,
                hometown: action.hometown,
                languages: action.languages,
                gender: action.gender,
                imageUrl: action.imageUrl,
                disabled: action.disabled
            }
        case UPDATE_PROFILE:
            return {
                isVisible: action.isVisible,
                disabled: action.disabled
            }
        case ENABLE_EDITING:
            return {
                name: state.name,
                email: state.email,
                phone: state.phone,
                aboutMe: state.aboutMe,
                city: state.city,
                country: state.country,
                company: state.company,
                school: state.school,
                hometown: state.hometown,
                languages: state.languages,
                gender: state.gender,
                imageUrl: state.imageUrl,
                isVisible: action.isVisible,
                disabled: action.disabled
            }
        case UPLOAD_IMAGE:
            return {
                name: state.name,
                email: state.email,
                phone: state.phone,
                aboutMe: state.aboutMe,
                city: state.city,
                country: state.country,
                company: state.company,
                school: state.school,
                hometown: state.hometown,
                languages: state.languages,
                gender: state.gender,
                imageUrl: action.imageUrl,
                isVisible: state.isVisible,
                disabled: state.disabled
            }
        default:
            return state;
    }
}
