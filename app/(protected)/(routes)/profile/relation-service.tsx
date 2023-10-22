export const getRelations = async (twitter_handle: string, query:string) => {
    return await fetch(
      `https://relation-service.nextnext.id`,
      {
        method: "GET",
        headers: {
        },
        body: JSON.stringify({query: query})
      },
    ).then((res) => res.json());
  };
  