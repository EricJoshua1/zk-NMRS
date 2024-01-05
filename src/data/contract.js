export const contractAddress = "0xad0b644361df724da64276973a907823f1c946fa";
export const contractABI = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "X",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "Y",
                type: "uint256",
              },
            ],
            internalType: "struct Pairing.G1Point",
            name: "a",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256[2]",
                name: "X",
                type: "uint256[2]",
              },
              {
                internalType: "uint256[2]",
                name: "Y",
                type: "uint256[2]",
              },
            ],
            internalType: "struct Pairing.G2Point",
            name: "b",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "X",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "Y",
                type: "uint256",
              },
            ],
            internalType: "struct Pairing.G1Point",
            name: "c",
            type: "tuple",
          },
        ],
        internalType: "struct Verifier.Proof",
        name: "proof",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "addUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "reportId",
        type: "uint256",
      },
      {
        internalType: "enum UserRegistration.ReportStatus",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "changeReportStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "reportId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum UserRegistration.ReportStatus",
        name: "newStatus",
        type: "uint8",
      },
    ],
    name: "IncidentReportStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "reportId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
    ],
    name: "IncidentReportSubmitted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dateOfEvent",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "locationOfEvent",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "severity",
        type: "string",
      },
      {
        internalType: "string",
        name: "involvedObjects",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "files",
        type: "string[]",
      },
    ],
    name: "submitIncidentReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "userRole",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "UserAdded",
    type: "event",
  },
  {
    inputs: [],
    name: "checkUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAcceptedReports",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "reporter",
            type: "address",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "dateOfEvent",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "locationOfEvent",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "severity",
            type: "string",
          },
          {
            internalType: "string",
            name: "involvedObject",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "files",
            type: "string[]",
          },
          {
            internalType: "enum UserRegistration.ReportStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct UserRegistration.IncidentReport[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReports",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "reporter",
            type: "address",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "dateOfEvent",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "locationOfEvent",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "severity",
            type: "string",
          },
          {
            internalType: "string",
            name: "involvedObject",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "files",
            type: "string[]",
          },
          {
            internalType: "enum UserRegistration.ReportStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct UserRegistration.IncidentReport[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReportsBySender",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "reporter",
            type: "address",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "dateOfEvent",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "locationOfEvent",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "severity",
            type: "string",
          },
          {
            internalType: "string",
            name: "involvedObject",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "files",
            type: "string[]",
          },
          {
            internalType: "enum UserRegistration.ReportStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct UserRegistration.IncidentReport[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "incidentReports",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "dateOfEvent",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "locationOfEvent",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "severity",
        type: "string",
      },
      {
        internalType: "string",
        name: "involvedObject",
        type: "string",
      },
      {
        internalType: "enum UserRegistration.ReportStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isUserVerified",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reportCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRole",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
