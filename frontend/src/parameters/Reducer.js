import * as Transformer from "./Transformers";

export function reducer(state, action) {
  switch (action.type) {
    case "initsession":
      return Transformer.initSession(state, action);

    case "setcountry":
      return Transformer.setCountry(state, action);

    case "setframe":
      return Transformer.setFrame(state, action);

    case "setup":
      return Transformer.setup(state, action);

    case "box-transform":
      return Transformer.transform(state, action);

    case "policy-transform-add":
      return Transformer.mutateMore(state, action);

    case "policy-transform-del":
      return Transformer.mutateLess(state, action);

    case "unactives": {
      return {
        ...state,
        unactives: action.content,
      };
    }

    case "resettrigger": {
      return {
        ...state,
        trigger: 0,
      };
    }

    case "crop":
      return state;

    case "log":
      console.log(state);
      return state;

    default:
      return state;
  }
}
