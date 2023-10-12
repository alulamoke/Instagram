export type TCustomError = {
  response: {
    data: {
      message: string;
    };
  };
};

export type TInternalError = {
  message: string;
};
