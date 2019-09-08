let graphqlCategoriesThunk = promiseActionsMaker(
    'categories',
    gql.request(
        `query cat{
            categories{
                _id, name
            }
        }`
    )
)
let login = `Alex`,
password = `123`;
let gql;
if (localStorage.authToken) gql = new GraphQLClient("/graphql",{ headers: { Authorization: 'Bearer' + localStorage.authToken}})
else  gql = new GraphQLClient("/graphql",{ headers: { }})


let graphqlLoginThunkMaker = (login, password) => promiseActionsMaker('login',
gql.request(
    `query login($login:String!, $password:String!){
        login(login:$login, password:$password)
      }`,{login, password}
    
))

let graphqlCategoryThunk = _id =>  promiseActionsMaker(
    'category',
    gql.request(
        `query oneCat($_id: ID!){
            category(_id: $_id){
              name,
              _id,
                  goods{
                _id, name, description, price
              }
            }
          }`,{_id}
))

let graphqlGoodThunk = _id =>  promiseActionsMaker(
  'good',
  gql.request(
      `query good($_id:ID!){
        good(_id:$_id){
          _id, name, description
        }
      }
      `,{_id}
))