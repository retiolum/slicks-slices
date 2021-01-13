import path from 'path';
import fetch from 'isomorphic-fetch';

async function createPizzaPages({ graphql, actions }) {
  // Grab template.
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // Grab data.
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // Create page.
  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        id: pizza.id,
      },
    })
  );
}

async function createToppingPages({ graphql, actions }) {
  // Grab template.
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // Grab data.
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // Create page.
  data.toppings.nodes.forEach((topping) =>
    actions.createPage({
      path: `/topping/${topping.slug.current}`,
      component: toppingTemplate,
      context: {
        toppingId: topping.id,
        toppingName: topping.name,
      },
    })
  );
}

async function createSlicemasterPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.slicemasters.nodes.forEach((person) => {
    actions.createPage({
      path: `/slicemaster/${person.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        id: person.id,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  console.log(pageSize);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  await Promise.all([
    createPizzaPages(params),
    createToppingPages(params),
    createSlicemasterPages(params),
  ]);
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}
