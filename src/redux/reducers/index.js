const initialState = {
  favourite: {
    content: [],
  },
};

const mainReducer = (state = initialState, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case "ADD_TO_FAV":
      if (state.favourite.content.includes(action.payload)) {
        return state; // non fare nulla se il payload è già presente nell'array
      }
      return {
        ...state,
        favourite: {
          content: [...state.favourite.content, action.payload],
        },
      };
    case "REMOVE_FROM_FAV":
      return {
        ...state,
        favourite: {
          content: [
            ...state.favourite.content.filter((i) => i !== action.payload),
          ],
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
