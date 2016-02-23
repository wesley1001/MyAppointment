import {
  COMPANY_REQUEST,
  COMPANY_SUCCESS,
  COMPANY_FAILURE,
  SET_COMPANY_SERVICE
} from '../../constants/ActionTypes'

const initialState = {
  entity: {
    "id": 3,
    "name_en": "Conroy Inc",
    "description_en": null,
    "city_en": "North Savanahport",
    "address_en": "35282 Price Vista\nAxelfurt, LA 56093",
    "opens_at": "8:00-am",
    "closes_at": "5:30-pm",
    "holidays": null,
    "latitude": "-19.203045",
    "longitude": "19.20108",
    "latitudeDelta": null,
    "longitudeDelta": null,
    "image": "http://lorempixel.com/640/480/?33188",
    "services": [
      {
        "id": 4,
        "parent_id": 0,
        "name_en": "spa",
        "description_en": "Hic amet illum et fuga harum et provident.",
        "image": "http://lorempixel.com/640/480/?14514",
        "pivot": {
          "company_id": 3,
          "service_id": 4,
          "price": "999.99",
          "duration_en": null,
          "description_en": null
        }
      },
      {
        "id": 12,
        "parent_id": 0,
        "name_en": "spa",
        "description_en": "Consequatur unde animi eaque fugiat architecto ea commodi iusto consequatur cum vero aut perferendis.",
        "image": "http://lorempixel.com/640/480/?10409",
        "pivot": {
          "company_id": 3,
          "service_id": 12,
          "price": "3.56",
          "duration_en": null,
          "description_en": null
        }
      },
      {
        "id": 17,
        "parent_id": 0,
        "name_en": "spa",
        "description_en": "Eum ipsa dolores omnis expedita numquam omnis porro sit natus et itaque consequatur qui.",
        "image": "http://lorempixel.com/640/480/?97813",
        "pivot": {
          "company_id": 3,
          "service_id": 17,
          "price": "999.99",
          "duration_en": null,
          "description_en": null
        }
      },
      {
        "id": 50,
        "parent_id": 0,
        "name_en": "salon",
        "description_en": "Incidunt autem laudantium quae qui hic accusamus odio qui ut.",
        "image": "http://lorempixel.com/640/480/?52561",
        "pivot": {
          "company_id": 3,
          "service_id": 50,
          "price": "50.11",
          "duration_en": null,
          "description_en": null
        }
      }
    ],
    "employees": [
      {
        "id": 9,
        "company_id": 3,
        "name_en": "Juwan",
        "holidays": "tuesday",
        "image": "http://lorempixel.com/640/480/?52970"
      }
    ]
  },
  isFetching: false,
  error: null,
  service:{
    "id": 4,
    "parent_id": 0,
    "name_en": "spa",
    "description_en": "Hic amet illum et fuga harum et provident.",
    "image": "http://lorempixel.com/640/480/?14514",
    "pivot": {
      "company_id": 3,
      "service_id": 4,
      "price": "999.99",
      "duration_en": null,
      "description_en": null
    }
  }
}

export default function company(state = initialState, action = {}) {
  switch (action.type) {
    case COMPANY_REQUEST:
      return {
        ... state,
        isFetching: true,
        error: null
      };
    case COMPANY_SUCCESS:
      return {
        ... state,
        isFetching: false,
        entity: action.entity,
        error: null
      };
    case COMPANY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case SET_COMPANY_SERVICE:
      return {
        ... state,
        service: action.entity,
        error: null
      };
    default:
      return state;
  }
}
