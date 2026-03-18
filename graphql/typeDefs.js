const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Owner {
        fullName: String!
        phone: String!
        email: String!
    }

    type Apartment {
        id: ID!
        district: String!
        floor: Int!
        area: Float!
        rooms: Int!
        owner: Owner!
        price: Float!
        createdAt: String
        updatedAt: String
    }

    input OwnerInput {
        fullName: String!
        phone: String!
        email: String!
    }

    input OwnerUpdateInput {
        fullName: String
        phone: String
        email: String
    }

    input ApartmentInput {
        district: String!
        floor: Int!
        area: Float!
        rooms: Int!
        owner: OwnerInput!
        price: Float!
    }

    input ApartmentUpdateInput {
        district: String
        floor: Int
        area: Float
        rooms: Int
        owner: OwnerUpdateInput
        price: Float
    }

    type Query {
        getAllApartments: [Apartment!]!
        getApartmentById(id: ID!): Apartment
    }

    type Mutation {
        createApartment(input: ApartmentInput!): Apartment!
        updateApartment(id: ID!, input: ApartmentUpdateInput!): Apartment
        deleteApartment(id: ID!): String!
    }
`);