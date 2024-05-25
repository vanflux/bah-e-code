export const createAutoAuthorizePlugin = () => ({
  statePlugins: {
    spec: {
      wrapActions: {
        executeRequest: (oriAction: any, { authActions }: any) => {
          return (options: any) => {
            return oriAction({
              ...options,
              fetch: async (...args: any) => {
                const res = await options.fetch(...args);
                const token = res.body?.accessToken;
                if (token) {
                  authActions.authorizeWithPersistOption({
                    bearer: {
                      name: 'bearer',
                      schema: {
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                        type: 'http',
                      },
                      value: token,
                    },
                  });
                }
                return res;
              },
            });
          };
        },
      },
    },
  },
});
