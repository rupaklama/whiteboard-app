const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const app = express();

// create socket.io server
const server = http.createServer(app);

app.use(cors());

// Socket data store in server
// note: The client store will be initialized and in sync with Socket Server data
let elements = [
  {
    id: "6fe1aaeb-063a-4a84-a3ac-ee3231e7d68a",
    roughElement: {
      shape: "rectangle",
      sets: [
        {
          type: "path",
          ops: [
            {
              op: "move",
              data: [202.33647994203423, 212.6056478205939],
            },
            {
              op: "bcurveTo",
              data: [
                225.2466526253163, 215.0218425483859, 250.22191931518174, 212.77509909338048, 266.0033805734278,
                213.75847502438333,
              ],
            },
            {
              op: "move",
              data: [201.64485149364, 213.1006140235493],
            },
            {
              op: "bcurveTo",
              data: [
                221.92984731582374, 214.05514154035615, 240.22954374382647, 213.82643303797127, 268.17298494738407,
                213.44532343125715,
              ],
            },
            {
              op: "move",
              data: [266.5277933421926, 213.32237796323463],
            },
            {
              op: "bcurveTo",
              data: [
                266.01595575497294, 229.9689738130565, 265.9483032737278, 240.41146832174962, 269.40757453491267,
                284.39074815669846,
              ],
            },
            {
              op: "move",
              data: [268.8805836540387, 213.07988184271352],
            },
            {
              op: "bcurveTo",
              data: [
                268.2417020533071, 237.3966166484409, 267.18313269514107, 262.5063176658878, 267.256246348434,
                284.1829318457436,
              ],
            },
            {
              op: "move",
              data: [269.18307736889943, 284.8848379671359],
            },
            {
              op: "bcurveTo",
              data: [
                254.81491160923756, 283.9433295440535, 240.51637885225713, 283.6874769221007, 203.1276017284735,
                284.8420949743419,
              ],
            },
            {
              op: "move",
              data: [267.26904513552336, 283.24095638593303],
            },
            {
              op: "bcurveTo",
              data: [
                246.01957109799312, 284.04596591578917, 225.34513777762436, 283.99199097583704, 202.94341019022508,
                283.7073054758415,
              ],
            },
            {
              op: "move",
              data: [202.37010488457037, 284.40450166354583],
            },
            {
              op: "bcurveTo",
              data: [
                202.59095908609976, 258.15282329379795, 199.75876278917605, 233.20683373339108, 203.18379796398517,
                215.60767444815755,
              ],
            },
            {
              op: "move",
              data: [201.8520258060186, 283.40727469494226],
            },
            {
              op: "bcurveTo",
              data: [
                201.6773244360325, 260.8547954675555, 201.8322467973349, 238.94447671105334, 201.02243074284567,
                213.77507675894154,
              ],
            },
          ],
        },
      ],
      options: {
        maxRandomnessOffset: 2,
        roughness: 1,
        bowing: 1,
        stroke: "#000",
        strokeWidth: 1,
        curveTightness: 0,
        curveFitting: 0.95,
        curveStepCount: 9,
        fillStyle: "hachure",
        fillWeight: -1,
        hachureAngle: -41,
        hachureGap: -1,
        dashOffset: -1,
        dashGap: -1,
        zigzagOffset: -1,
        seed: 0,
        disableMultiStroke: false,
        disableMultiStrokeFill: false,
        preserveVertices: false,
        fillShapeRoughnessGain: 0.8,
        randomizer: {
          seed: 0,
        },
      },
    },
    type: "RECTANGLE",
    x1: 202,
    y1: 214,
    x2: 268,
    y2: 284,
  },
];

// configure socket.io server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// socket.io event listeners
io.on("connection", socket => {
  console.log(`${socket.id} Client user connected to socket server!`);

  // note: to which user to emit an event on Initial connection
  // note: every user has separate Socked Object with Id. New ID is generated for every new session.
  io.to(socket.id)
    // emit an event to share related data
    .emit("whiteboard-state", elements);

  // Register new event listener to handle client emit event - "element-update"
  socket.on("element-update", elementData => {
    updateElementInElementsList(elementData);

    // note: Once our Server Store is updated with all the current client data above,
    // Send that updated element detail to client to update it in the Redux Store to publish across all users.
    // emit an event to all connected client users except a user who made an update/change
    socket.broadcast.emit("element-update", elementData);
  });
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// add client updated element data in our server store as well
const updateElementInElementsList = elementData => {
  const index = elements.findIndex(el => el.id === elementData.id);

  if (index === -1) {
    elements = [...elements, elementData];
  } else {
    elements[index] = elementData;
  }
};
